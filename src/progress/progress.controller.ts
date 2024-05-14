import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProgressService } from "./progress.service";
import { ApiResult } from "src/common/classes/api-result";

@ApiTags("Progress")
@Controller("progress")
export class ProgressController {
    constructor(private readonly progressService: ProgressService) {

    }

    @Get(':id')
    async getProgressByUser(@Param("id") id: number) {
        const result = await this.progressService.getProgressByUser(id);

        return new ApiResult().success(result);

    }
}
