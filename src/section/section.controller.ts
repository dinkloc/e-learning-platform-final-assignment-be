import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SectionService } from "./section.service";
import { ApiResult } from "src/common/classes/api-result";

@ApiTags("Section Course")
@Controller("section")
export class SectionController {
    
    constructor(private readonly sectionService: SectionService) {}
    @Get('/')
    async getSectionById() {
        const result = await this.sectionService.getSectionByIdCourse();
        
        return new ApiResult().success(result);
    }
}