import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/database/models/course.entity";
import { Repository } from "typeorm";
import { CourseDTO, GetCourseDTOByID } from "./dto/course.dto";
import { ApiError } from "src/common/classes/api-error";

@Injectable()
export class CourseService {
    constructor(@InjectRepository(Course, "ELearning")
    private readonly courseRepository: Repository<Course>) {

    }

    async getCourses(coursesDto: CourseDTO) {

        const queryBuilder = this.courseRepository.createQueryBuilder('cs').select('cs.*');

        queryBuilder.orderBy('created_at', "ASC").limit(coursesDto.limit).offset(coursesDto.offset)

        const [result, count] = await Promise.all([
            queryBuilder.getRawMany(),
            queryBuilder.getCount()
        ])

        return {
            record: result,
            total: count
        }
    }

    async getCourseById(id: number) {
        const course = await this.courseRepository.findOneBy({ course_id: Number(id) })
        if (!course) {
            throw new ApiError("Not Found Course")
        }
    }
}