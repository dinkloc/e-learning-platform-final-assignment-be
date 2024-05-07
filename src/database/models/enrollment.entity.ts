import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { User } from "./user.entity";
import { Course } from "./course.entity";
import { StatusEnrollment } from "src/enrollments/dtos/enrollment.dto";

@Entity("enrollments")
export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ name: 'user_id' })
    userId: number;

    @ManyToOne(() => Course, course => course)
    @JoinColumn({ name: "course_id" })
    course: Course;

    @Column({ name: 'course_id' })
    courseId: number;


    @CreateDateColumn({ name: 'enrollment_date' })
    @ApiProperty({ type: 'string', format: 'date-time' })
    enrollmentDate: Date;

    @UpdateDateColumn({ name: "enrollment_accept" })
    @ApiProperty({ type: 'string', format: 'date-time' })
    enrollmentAccept: Date;

    @Column({ name: 'url_image_student_card' })
    urlImageStudentCard: string

    @Column({
        type: 'enum',
        enum: StatusEnrollment,
        default: StatusEnrollment.WAITING,
        name: "status_enrollment"
    })
    @ApiProperty()
    statusEnrollment: StatusEnrollment;
}