import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { AcceptEnrollmentDTO, EnrollmentDTO } from "./dtos/enrollment.dto";
import { Enrollment } from "src/database/models/enrollment.entity";
import { User } from "src/database/models/user.entity";
import { Course } from "src/database/models/course.entity";
import { ApiError } from "src/common/classes/api-error";
import { S3Service } from "src/common/services/s3.service";


@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(Enrollment, "ELearning")
        private readonly enrollmentRepository: Repository<Enrollment>,
        @InjectRepository(User, "ELearning")
        private readonly userRepository: Repository<User>,
        @InjectRepository(Course, "ELearning")
        private readonly courseRepository: Repository<Course>,
        private readonly s3Service: S3Service) { }

    async seedData() {
        const newUser = this.userRepository.create({ email: "nguyendloc009@gmail.com", password: "Savvycom@1 " })
        console.log(newUser)
        await this.userRepository.save(newUser);

        const newCourse = this.courseRepository.create({ name: "Clean Code 2024" });
        await this.courseRepository.save(newCourse);

        const newEnroll = this.enrollmentRepository.create({ urlImageStudentCard: "https:google.com" })
        newEnroll.course = newCourse;
        newEnroll.user = newUser;
        await this.enrollmentRepository.save(newEnroll);
    }


    async enrollCourse(file: any, enrollmentDTO: EnrollmentDTO) {

        const userEnrollCourse = await this.userRepository.findOne({ where: { id: enrollmentDTO.user_id } })
        if (!userEnrollCourse) {
            throw new ApiError("NOT FOUND USER")
        }

        const courseEnroll = await this.courseRepository.findOne({ where: { course_id: enrollmentDTO.course_id } })
        if (!courseEnroll) {
            throw new ApiError("NOT FOUND COURSE")
        }

        const { Location } = await this.s3Service.uploadFile(file);

        const saveToRepo = this.enrollmentRepository.create({ urlImageStudentCard: Location });
        saveToRepo.course = courseEnroll;
        saveToRepo.user = userEnrollCourse;

        await this.enrollmentRepository.save(saveToRepo);

    }

    async acceptAccessCourse(acceptEnrollDTO: AcceptEnrollmentDTO) {
        const enrollCourse = await this.enrollmentRepository.findOneBy({
            id: acceptEnrollDTO.enrollmentId
        })

        if (!enrollCourse) {
            throw new ApiError("Not Found ")
        }

        const result = await this.enrollmentRepository
            .createQueryBuilder()
            .update(Enrollment)
            .set({ statusEnrollment: acceptEnrollDTO.statusEnrollment })
            .where("id = :id", { id: acceptEnrollDTO.enrollmentId })
            .returning("*") // Return all columns of the updated row
            .execute();

        const updatedEnrollment = result.raw[0];
        return updatedEnrollment;
    }

}