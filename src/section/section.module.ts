import { Module } from "@nestjs/common";
import { SectionService } from "./section.service";
import { SectionController } from "./section.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Section } from "src/database/models/section.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Section], "ELearning")],
    providers: [SectionService],
    controllers:[SectionController]
})

export class SectionModule{ }