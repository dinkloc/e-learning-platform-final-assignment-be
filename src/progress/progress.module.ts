import { Module } from "@nestjs/common";
import { ProgressController } from "./progress.controller";
import { ProgressService } from "./progress.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProgress } from "src/database/models/user-progress.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserProgress], 'ELearning')],
    controllers: [ProgressController],
    providers: [ProgressService]
})

export class ProgressModule { }