import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/user-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post("/register")
  async register(@Body() userRegister: RegisterDTO) {
      await this.authService.register(userRegister);
  }

  @Post("/login")
  async login() {

  }

  @Post("/forgot-password")
  async forgotPassword() {

  }

  @Post("/reset-password")
  async resetPassword() {

  }
}