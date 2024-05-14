import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Lesson } from "./lesson.entity";

@Entity("discussion")
export class Discussion {
    @PrimaryGeneratedColumn()
    discussion_id: number;

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

    @Column({ name: 'message_content' })
    message_content: string;

}