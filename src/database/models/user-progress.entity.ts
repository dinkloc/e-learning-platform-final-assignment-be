import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Lesson } from "./lesson.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("user_progress")
export class UserProgress {
    @PrimaryGeneratedColumn()
    user_progress_id: number

    @ManyToOne(() => User, user => user)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ name: 'user_id' })
    userId: number;

    @ManyToOne(() => Lesson, lesson => lesson)
    @JoinColumn({ name: "lesson_id" })
    lesson: Lesson;

    @Column({ name: 'lesson_id' })
    lessonId: number;

    @CreateDateColumn({ name: 'created_at' })
    @ApiProperty({ type: 'string', format: 'date-time' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @ApiProperty({ type: 'string', format: 'date-time' })
    updatedAt: Date;

    @Column({ name: 'is_completed', type: 'boolean', default: false })
    @ApiProperty()
    isCompleted: boolean
}