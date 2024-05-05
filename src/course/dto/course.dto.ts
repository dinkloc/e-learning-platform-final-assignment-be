import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { PageDTO } from "src/common/classes/pagination.dto";

export class CourseDTO extends PageDTO { }

export class GetCourseDTOByID {
    @Transform(({ value }) => Number(value))
    @ApiProperty({ type: 'number', required: false })
    readonly id: number
}