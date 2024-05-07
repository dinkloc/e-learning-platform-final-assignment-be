import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Course } from "src/database/models/course.entity";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { Section } from "src/database/models/section.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Course, Section], "ELearning")],
    controllers: [CourseController],
    providers: [CourseService]
})
export class CourseModule { }