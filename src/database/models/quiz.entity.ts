import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./lesson.entity";

@Entity("quiz")
export class Quiz {
    @PrimaryGeneratedColumn()
    quiz_id: number;

    @Column({ name: 'lesson_id' })
    lesson_id: number;

    @OneToOne(() => Lesson)
    @JoinColumn({ name: 'lesson_id' })
    lesson: Lesson;
}