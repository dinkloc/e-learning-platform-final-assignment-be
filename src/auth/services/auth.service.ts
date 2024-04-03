import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../database/models/user.entity';
import { RegisterDTO } from '../dto/user-login.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User, "ELearning")
    private readonly userRepository: Repository<User>
  ) {}

  async register(userRegister: RegisterDTO) {
      const user = await this.userRepository.findOneBy({email: userRegister.email})
      console.log(user);
  }

  async login() {

  }

  async forgotPassword() {

  }

  async resetPassword() {

  }

}