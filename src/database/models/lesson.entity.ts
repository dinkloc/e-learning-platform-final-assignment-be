import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./section.entity";
import { ApiProperty } from "@nestjs/swagger";
import { UserProgress } from "./user-progress.entity";
import { Quiz } from "./quiz.entity";
import { Discussion } from "./discussion.entity";

@Entity("lesson")
export class Lesson {
    @PrimaryGeneratedColumn()
    lesson_id: number

    @Column({ name: "section_id" })
    section_id: number;

    @ManyToOne(() => Section, section => section.lesion)
    @JoinColumn({ name: "section_id" })
    section: Section;

    @Column({ name: "lesson_name", nullable: true })
    lesson_name: string;

    @Column({ name: "source_video_lesson", nullable: true })
    source_video_lesson: string;

    @OneToMany(() => UserProgress, userprogress => userprogress.lesson)
    userProgress: UserProgress[];

    @OneToMany(() => Discussion, discussion => discussion.lesson)
    discussion: Discussion[];

    @OneToOne(() => Quiz, quiz => quiz.lesson)
    quiz: Quiz

    @Column({ name: "minutes_per_lesson", nullable: true })
    @ApiProperty({
        type: Number
    })
    minutesPerLesson: number;

}