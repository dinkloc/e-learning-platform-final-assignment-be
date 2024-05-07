import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { DiscussionModule } from './discussion/discussion.module';
import { EnrollmentModule } from './enrollments/enrollment.module';
import { CourseModule } from './course/course.module';
import { SectionModule } from './section/section.module';
import { LessonModule } from './lesson/lesson.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    DiscussionModule,
    EnrollmentModule,
    CourseModule,
    SectionModule,
    LessonModule,
    UserModule
  ],
})
export class AppModule { }
