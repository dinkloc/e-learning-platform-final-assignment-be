import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Enrollment } from "./enrollment.entity";
import { Section } from "./section.entity";


@Entity("courses")
export class Course {
    @PrimaryGeneratedColumn()
    course_id: number

    @Column({ length: 100, default: '', nullable: true, name: 'name' })
    name: string

    @Column({ default: '', nullable: true, name: 'description' })
    description: string

    @Column({ length: 100, default: '', nullable: true, name: 'thumbnail' })
    thumbnail: string

    @OneToMany(() => Enrollment, enrollment => enrollment.course)
    enrollments: Enrollment[];

    @OneToMany(() => Section, section => section.course )
    section: Section[]

}