import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Lesson } from "src/database/models/lesson.entity";
import { LessonController } from "./lesson.controller";
import { LessonService } from "./lesson.service";

@Module({
    imports: [TypeOrmModule.forFeature([Lesson], "ELearning")],
    controllers: [LessonController],
    providers: [LessonService]
})
export class LessonModule { }