import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "src/database/models/course.entity";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";

@Module({
    imports: [TypeOrmModule.forFeature([Course], "ELearning")],
    controllers: [CourseController],
    providers: [CourseService]
})
export class CourseModule { }