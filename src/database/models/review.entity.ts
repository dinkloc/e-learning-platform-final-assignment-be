import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Course } from "./course.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("review")
export class Review {
    @PrimaryGeneratedColumn()
    review_id: number;

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

    @CreateDateColumn({ name: 'created_at' })
    @ApiProperty({ type: 'string', format: 'date-time' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @ApiProperty({ type: 'string', format: 'date-time' })
    updatedAt: Date;
}