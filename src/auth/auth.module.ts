import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User], "ELearning")],
  controllers: [AuthController],
  providers: [AuthService]
})

export class AuthModule {}