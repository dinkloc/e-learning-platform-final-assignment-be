import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discussion } from 'src/database/models/discussion.entity';
import { Repository } from 'typeorm';
import { CreateNewDiscussionDTO } from './dto/discussion.dto';
import { User } from 'src/database/models/user.entity';
import { Lesson } from 'src/database/models/lesson.entity';
import { ApiError } from 'src/common/classes/api-error';

@Injectable()
export class DiscussionService {
    constructor(
        @InjectRepository(Discussion, 'ELearning')
        private readonly discussionRepository: Repository<Discussion>,
        @InjectRepository(User, 'ELearning')
        private readonly userRepository: Repository<User>,
        @InjectRepository(Lesson, 'ELearning')
        private readonly lessonRepository: Repository<Lesson>,
    ) { }

    async getDiscussion(id: number) {
        return await this.discussionRepository
            .createQueryBuilder('d')
            .select('*')
            .innerJoin('d.user', 'user', 'user_id = user_id')
            .where('d.lesson_id = :id', { id: id })
            .getRawMany();
    }

    async createDiscussion(payload: CreateNewDiscussionDTO) {
        const user = await this.userRepository.findOne({ where: { id: payload.user_id } });
        if (!user) {
            throw new ApiError("Error");
        }
        const lesson = await this.lessonRepository.findOne({
            where: {
                lesson_id: payload.lesson_id
            }
        })
        if (!lesson) {
            throw new ApiError("Error");
        }

        const newDiscussion = this.discussionRepository.create({ message_content: payload.message_content })
        newDiscussion.user = user;
        newDiscussion.lesson = lesson;

        // console.log(newDiscussion);

        await this.discussionRepository.save(newDiscussion);
    }
}
