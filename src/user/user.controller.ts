import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { ApiResult } from "src/common/classes/api-result";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("/")
    async getAllUser() {
        const result = await this.userService.getUser();

        return new ApiResult().success(result);
    }

}