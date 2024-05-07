import { Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CourseService } from "./course.service";
import { ApiResult } from "src/common/classes/api-result";
import { CourseDTO } from "./dto/course.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { PermissionGuard } from "src/auth/permission.guard";
import { Roles } from "src/auth/decorators/role.decorator";
import { Role } from "src/types/role.enum";

@ApiTags("Course")
// @ApiBearerAuth()
// @UseGuards(AuthGuard)
@Controller("courses")
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Get("/")
    async getCourses(@Query() params: CourseDTO) {
        const result = await this.courseService.getCourses(params);

        return new ApiResult().success(result)
    }

    @Get(":id")
    async getById(@Param('id') id: number) {
        const result = await this.courseService.getCourseById(id);

        return new ApiResult().success(result)
    }

}