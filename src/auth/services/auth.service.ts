import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../database/models/user.entity';
import { LoginDTO, RegisterDTO } from '../dto/user-login.dto';
import { ApiError } from '../../common/classes/api-error';
import { ErrorCode } from '../../common/constants/error';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User, "ELearning")
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async register(userRegister: RegisterDTO) {
    const user = await this.userRepository.findOneBy({ email: userRegister.email });
    if (user) {
      throw new ApiError(ErrorCode.USER_ALREADY_EXISTS);
    }

    const newUser = this.userRepository.create(userRegister);
    await this.userRepository.save(newUser);

    return true;

  }

  async login(userLogin: LoginDTO) {
    const user = await this.userRepository.findOne({ where: { email: userLogin.email } });
    if (!user) {
      throw new ApiError(ErrorCode.INVALID_EMAIL_OR_PASSWORD);
    }

    const passwordCheck = await user.validatePassword(userLogin.password)
    if (!passwordCheck) {
      throw new ApiError(ErrorCode.INVALID_EMAIL_OR_PASSWORD);
    }

    const payload = {
      id: user.id,
      email: user.email ? user.email : null,
      role: user.role,
      name: user.firstName
    }

    return { user: { ...user }, token: this.jwtService.sign(payload) }

  }

  // async test() {
  //   const queryBuilder = this.userRepository.createQueryBuilder("u").select('u.*')

  //   queryBuilder.orderBy('id', 'DESC').limit(2).offset(2);

  //   const [result, count] = await Promise.all([
  //     queryBuilder.getCount(),
  //     queryBuilder.getRawMany()
  //   ])

  //   console.table(result);
  //   console.log(count)
  // }

  async changePassword(currentUser) {
    // console.log(currentUser);
    const user = await this.userRepository.findOne({ where: { email: currentUser.email } });
    console.log(user);
  }

}