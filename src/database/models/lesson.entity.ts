import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./section.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("lesson")
export class Lesson {
    @PrimaryGeneratedColumn()
    lesson_id: number

    @Column({name: "section_id"})
    section_id: number;

    @ManyToOne(() => Section, section => section.lesion)
    @JoinColumn({name: "section_id"})
    section: Section;

    @Column({name: "lesson_name", nullable: true})
    lesson_name: string;

    @Column({name: "source_video_lesson", nullable: true})
    source_video_lesson: string;

}