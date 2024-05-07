import { Body, Controller, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChangePasswordDTO, LoginDTO, RegisterDTO } from './dto/user-login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { ApiResult } from 'src/common/classes/api-result';
import { AuthGuard } from './auth.guard';

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post("/register")
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({
    summary: 'Register by email ',
  })
  async register(@Body() userRegister: RegisterDTO) {
    const result = await this.authService.register(userRegister);
    return new ApiResult().success(result);
  }

  @Post("/login")
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({
    summary: 'Login by email',
  })
  async login(@Body() userLogin: LoginDTO) {
    const result = await this.authService.login(userLogin);
    return new ApiResult().success(result);
  }

  @UseGuards(AuthGuard)
  @Post("/change-password")
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({
    summary: "Change Password"
  })
  async forgotPassword(@Body() changePassword: ChangePasswordDTO) {
    const result = await this.authService.changePassword(changePassword);

    return new ApiResult().success(result);
  }
}