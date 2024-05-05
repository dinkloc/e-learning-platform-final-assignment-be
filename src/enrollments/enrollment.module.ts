import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Enrollment } from "src/database/models/enrollment.entity";
import { EnrollmentController } from "./enrollment.controller";
import { EnrollmentService } from "./enrollment.service";
import { User } from "src/database/models/user.entity";
import { Course } from "src/database/models/course.entity";
import { S3Service } from "src/common/services/s3.service";

@Module({
    imports: [TypeOrmModule.forFeature([Enrollment, User, Course], 'ELearning')],
    controllers: [EnrollmentController],
    providers: [EnrollmentService, S3Service]
})

export class EnrollmentModule { }