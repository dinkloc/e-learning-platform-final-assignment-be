import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterEnrollmentTable1714837057364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TYPE IF EXISTS "status_enrollment_enum";
            CREATE TYPE status_enrollment_enum AS ENUM ('WAITING', 'ACCEPTED');
            ALTER TABLE "enrollments" ADD "status_enrollment" status_enrollment_enum DEFAULT 'WAITING';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TYPE IF EXISTS "status_enrollment_enum"
            ALTER TABLE "enrollments" DROP COLUMN "status_enrollment";
        `);
    }

}
