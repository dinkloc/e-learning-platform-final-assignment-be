import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

import { AcceptEnrollmentDTO, EnrollmentDTO, GetEnrollmentExist } from "./dtos/enrollment.dto";
import { EnrollmentService } from "./enrollment.service";
import { ApiResult } from "src/common/classes/api-result";
import { PermissionGuard } from "src/auth/permission.guard";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/decorators/role.decorator";
import { Role } from "src/types/role.enum";

@ApiTags("Enrollment Course")
// @ApiBearerAuth()
// @UseGuards(AuthGuard)
@Controller("enrollment")
export class EnrollmentController {
    constructor(
        private readonly enrollmentService: EnrollmentService
    ) { }

    @Get("/user-course")
    @ApiOperation({
        summary: "Get Enrollment"
    })
    async getEnrollmentById(@Query() getCourseByUserAndCourse: GetEnrollmentExist) {
        const result = await this.enrollmentService.getEnrollmentById(getCourseByUserAndCourse);

        return new ApiResult().success(result);
    }

    @Post("/")
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({
        summary: "Enrollment Course"
    })
    async enrollmentCourse(@UploadedFile() file: Express.Multer.File, @Body() body) {
        const result = await this.enrollmentService.enrollCourse(file, body);

        return new ApiResult().success(result);
    }

    @UseGuards(PermissionGuard)
    @Roles(Role.ADMIN)
    @Patch("/accept-enrollment")
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOperation({
        summary: "Accept Enrollment"
    })
    async acceptEnrollment(@Body() acceptEnrollment: AcceptEnrollmentDTO) {
        const result = await this.enrollmentService.acceptAccessCourse(acceptEnrollment);

        return new ApiResult().success(result);
    }

    @Get("/course-enrolled-by-user/:id")
    async getCourseEnrolledByUser(@Param('id') id: number) {
        const result = await this.enrollmentService.getCourseEnrolledByUser(id);
        return new ApiResult().success(result);
    }

}