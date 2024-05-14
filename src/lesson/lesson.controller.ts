import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LessonService } from "./lesson.service";
import { ApiResult } from "src/common/classes/api-result";

@ApiTags("Lesson")
@Controller("lesson")
export class LessonController {
    constructor(private readonly lessonService: LessonService) { }

    @Get(":id")
    async getLessonById(@Param('id') id: number) {
        const result = await this.lessonService.getLessonById(id)

        return new ApiResult().success(result);
    }
}