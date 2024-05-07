import { Injectable } from "@nestjs/common";
import {  InjectRepository } from "@nestjs/typeorm";
import { Section } from "src/database/models/section.entity";
import { Repository } from "typeorm";

@Injectable()
export class SectionService{
    constructor(
        @InjectRepository(Section, "ELearning")
        private readonly sectionRepository: Repository<Section>) { }
    
    async getSectionByIdCourse() {
        return await this.sectionRepository.find();
    }    
}