import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "src/auth/auth.guard";
import { CommentService } from "./comment.service";
import { ApiResult } from "src/common/classes/api-result";

@ApiTags("Comment")
@Controller("comment")
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @UseGuards(AuthGuard)
    @Get("/")
    async get(@Request() req) {
        console.log(req.user);
        const result = await this.commentService.getAllComment();
        return new ApiResult().success(result);
    }
}