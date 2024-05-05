import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";

export class PageDTO {
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @ApiProperty({ type: 'number', required: false, default: 8 })
    readonly limit: number = 8;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @ApiProperty({ type: 'number', required: false, default: 0 })
    readonly offset: number = 0;
}