import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants/constants';

@Module({
  imports: [TypeOrmModule.forFeature([User], "ELearning"),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: "6000s" }
  })],
  controllers: [AuthController],
  providers: [AuthService]
})

export class AuthModule { }