import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "src/auth/auth.guard";
import { DiscussionService } from "./discussion.service";
import { ApiResult } from "src/common/classes/api-result";

@ApiTags("Discussion")
@Controller("discussion")
export class DiscussionController {
    constructor(private readonly DiscussionService: DiscussionService) { }

    @UseGuards(AuthGuard)
    @Get("/")
    async get(@Request() req) {
        const result = await this.DiscussionService.getAllDiscussion();
        return new ApiResult().success(result);
    }
}