import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
@Module({
  imports: [DatabaseModule, AuthModule, CommentModule],
})
export class AppModule {}
