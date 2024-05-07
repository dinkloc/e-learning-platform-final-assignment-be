import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LessonService } from "./lesson.service";
import { ApiResult } from "src/common/classes/api-result";

@ApiTags("Lesson")
@Controller("lesson")
export class LessonController {
    constructor(private readonly lessonService: LessonService) { }

    @Get("/:id")
    async getLessonById() {
        const result = await this.getLessonById();

        return new ApiResult().success(result);
    }
}