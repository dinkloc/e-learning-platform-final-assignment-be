import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "src/database/models/lesson.entity";
import { Repository } from "typeorm";

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson, "ELearning")
        private readonly lessonRepository: Repository<Lesson>
    ) { }
    async getLessonById() {
        return this.lessonRepository.find();
    }
}