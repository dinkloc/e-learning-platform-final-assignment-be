import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateNewDiscussionDTO {
    @IsNotEmpty()
    @ApiProperty({
        type: "number",
        required: true
    })
    user_id: number

    @IsNotEmpty()
    @ApiProperty({
        type: "number",
        required: true
    })
    lesson_id: number

    @IsNotEmpty()
    @ApiProperty({
        type: "string",
        required: true
    })
    message_content: string
}