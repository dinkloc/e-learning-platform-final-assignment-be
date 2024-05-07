import { Course } from 'src/database/models/course.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from './lesson.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity("section")
export class Section {
    @PrimaryGeneratedColumn()
    section_id: number

    @Column({name: "course_id"})
    courseId: number;


    @ManyToOne(() => Course, course => course.section) 
    @JoinColumn({name: "course_id"})
    course: Course

    @OneToMany(() => Lesson, lesson => lesson.section)
    lesion: Lesson[]

    @Column({name: "section_name", nullable: true})
    @ApiProperty({
        type: String
    })
    section_name: string;
}