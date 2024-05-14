import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "src/auth/auth.guard";
import { DiscussionService } from "./discussion.service";
import { ApiResult } from "src/common/classes/api-result";
import { CreateNewDiscussionDTO } from "./dto/discussion.dto";

@ApiTags("Discussion")
@Controller("discussion")
export class DiscussionController {
    constructor(private readonly discussionService: DiscussionService) { }

    // @UseGuards(AuthGuard)
    @Get(":id")
    async getDiscussionByLesson(@Param("id") id: number) {
        const result = await this.discussionService.getDiscussion(id)
        return new ApiResult().success(result);
    }

    @Post("/")
    async createNewDiscussion(@Body() body: CreateNewDiscussionDTO) {
        const result = await this.discussionService.createDiscussion(body);

        return new ApiResult().success(result);
    }
}