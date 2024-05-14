import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SectionService } from "./section.service";
import { ApiResult } from "src/common/classes/api-result";

@ApiTags("Section")
@Controller("section")
export class SectionController {

    constructor(private readonly sectionService: SectionService) { }


    @Get("/")
    async getAllSection() {
        const result = await this.sectionService.getAllSection();

        return new ApiResult().success(result);
    }

    @Get(':id')
    async getSectionById(@Param('id') id: number) {
        const result = await this.sectionService.getSectionByIdCourse(id);

        return new ApiResult().success(result);
    }

    @Get("/total-minutes-per-course/:id")
    async getTotalMinutesPerCourse(@Param('id') id: number) {
        const result = await this.sectionService.getTotalMinutesPerCourse(id);

        return new ApiResult().success(result);
    }
}