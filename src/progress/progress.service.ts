import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserProgress } from 'src/database/models/user-progress.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgressService {
    constructor(
        @InjectRepository(UserProgress, 'ELearning')
        private readonly userProgress: Repository<UserProgress>,
    ) { }

    async getProgressByUser(id: number) {
        return await this.userProgress
            .createQueryBuilder("u")
            .select("SUM(lesson.minutes_per_lesson) as Total_minutes_completed")
            .innerJoin("u.lesson", "lesson", "lesson.lesson_id = u.lesson_id")
            .where("u.isCompleted = true")
            .groupBy("lesson.section_id")
            .getRawMany();
    }
}
