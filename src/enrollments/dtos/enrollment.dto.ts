import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty } from "class-validator";

export enum StatusEnrollment {
    WAITING = 'WAITING',
    ACCEPTED = 'ACCEPTED'
}

export class EnrollmentDTO {
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
    course_id: number

    @IsNotEmpty()
    @ApiProperty({
        type: String,
        required: true
    })
    urlImageStudentCard: string
}

export class AcceptEnrollmentDTO {

    @IsNotEmpty()
    @ApiProperty({
        type: "number",
        required: true
    })
    enrollmentId: number

    @IsNotEmpty()
    @IsEnum(StatusEnrollment)
    @ApiProperty({
        type: String,
        required: true
    })
    statusEnrollment: StatusEnrollment


}