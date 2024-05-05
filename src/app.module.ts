import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { EnrollmentModule } from './enrollments/enrollment.module';
import { CourseModule } from './course/cousre.module';
@Module({
  imports: [DatabaseModule, AuthModule, CommentModule, EnrollmentModule, CourseModule],
})
export class AppModule { }
