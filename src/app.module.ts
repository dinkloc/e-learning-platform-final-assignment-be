import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { DiscussionModule } from './discussion/discussion.module';
import { EnrollmentModule } from './enrollments/enrollment.module';
import { CourseModule } from './course/course.module';
import { SectionModule } from './section/section.module';
import { LessonModule } from './lesson/lesson.module';
import { UserModule } from './user/user.module';
import { ProgressModule } from './progress/progress.module';
import { ReviewModule } from './review/review.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    DiscussionModule,
    EnrollmentModule,
    CourseModule,
    SectionModule,
    LessonModule,
    UserModule,
    ProgressModule,
    ReviewModule,
    QuizModule
  ],
})
export class AppModule { }
