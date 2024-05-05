import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CourseService } from "./course.service";
import { ApiResult } from "src/common/classes/api-result";
import { CourseDTO } from "./dto/course.dto";

@ApiTags("Course")
@Controller("courses")
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Get("/")
    async getCourses(@Query() params: CourseDTO) {
        const result = await this.courseService.getCourses(params);

        return new ApiResult().success(result)
    }

    @Get(":id")
    async getById(@Param('id') id: number,) {
        const result = await this.courseService.getCourseById(id);

        return new ApiResult().success(result)
    }
}