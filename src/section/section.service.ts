import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Section } from "src/database/models/section.entity";
import { Repository } from "typeorm";

@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(Section, "ELearning")
        private readonly sectionRepository: Repository<Section>) { }


    async getAllSection() {
        return await this.sectionRepository.createQueryBuilder("s").select("s.*").orderBy("s.section_id").getRawMany();

    }

    async getSectionByIdCourse(id: number) {
        return await this.sectionRepository.createQueryBuilder("s").select("s.*").where("s.courseId = :id", { id: id }).orderBy("s.section_id", "ASC").getRawMany();
    }

    async getTotalMinutesPerCourse(id: number) {
        return await this.sectionRepository
            .createQueryBuilder("s")
            .select("SUM(s.total_minutes_per_section)", "total_minutes_per_course")
            .where("s.courseId = :id", { id: id })
            .getRawMany();
    }
}