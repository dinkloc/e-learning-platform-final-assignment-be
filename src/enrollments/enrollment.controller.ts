import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AcceptEnrollmentDTO } from "./dtos/enrollment.dto";
import { EnrollmentService } from "./enrollment.service";
import { ApiResult } from "src/common/classes/api-result";
import { PermissionGuard } from "src/auth/permission.guard";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/decorators/role.decorator";
import { Role } from "src/types/role.enum";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Enrollment Course")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("enrollment")
export class EnrollmentController {
    constructor(
        private readonly enrollmentService: EnrollmentService
    ) { }


    @Post("/")
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({
        summary: "Enrollment Course"
    })
    async enrollmentCourse(@UploadedFile() file: Express.Multer.File, @Body() body) {
        const result = await this.enrollmentService.enrollCourse(file, body);

        await this.enrollmentService.seedData();

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