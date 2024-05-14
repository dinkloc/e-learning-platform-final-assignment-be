import { Module } from "@nestjs/common";
import { DiscussionController } from "./discussion.controller";
import { DiscussionService } from "./discussion.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Discussion } from "src/database/models/discussion.entity";
import { User } from "src/database/models/user.entity";
import { Lesson } from "src/database/models/lesson.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Discussion, User, Lesson], "ELearning")],
    controllers: [DiscussionController],
    providers: [DiscussionService]
})

export class DiscussionModule { }