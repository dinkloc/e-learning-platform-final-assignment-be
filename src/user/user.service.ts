import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User, 'ELearning')
        private readonly userRepository: Repository<User>,
    ) { }

    async getUser() {
        return this.userRepository.find();
    }
}
