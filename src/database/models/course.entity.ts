import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Enrollment } from "./enrollment.entity";
import { Section } from "./section.entity";
import { Review } from "./review.entity";
import { ApiProperty } from "@nestjs/swagger";


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

    @OneToMany(() => Section, section => section.course)
    section: Section[]

    @OneToMany(() => Review, review => review.course)
    review: Review[]

    @Column({ name: "author", nullable: true })
    @ApiProperty({
        type: String
    })
    author: string;

    @Column({ name: "total_time_course", nullable: true })
    @ApiProperty({
        type: Number
    })
    totalTimeCourse: number;

    @UpdateDateColumn({ name: 'updated_at' })
    @ApiProperty({ type: 'string', format: 'date-time' })
    updatedAt: Date;

}