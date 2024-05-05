import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterEnrollmentTable1714797231710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "enrollments" ADD "url_image_student_card" varchar(255) NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "enrollments" DROP COLUMN "url_image_student_card";
        `);
    }

}
