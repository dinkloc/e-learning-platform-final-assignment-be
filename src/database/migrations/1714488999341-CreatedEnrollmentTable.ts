import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreatedEnrollmentTable1714488999341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS "enrollments";
        DROP TYPE IF EXISTS "enrollment_status_enum";
        CREATE TYPE enrollment_status_enum AS ENUM ('WAITING', 'ACCEPTED');
        CREATE TABLE "enrollment" (
            "enrollment_id" serial PRIMARY KEY NOT NULL,
            "user_id" int NOT NULL,
            "course_id" int NOT NULL,
            "enrollment_date" TIMESTAMP NOT NULL DEFAULT now(),
            "enrollment_accept" TIMESTAMP NULL,
            "status" enrollment_status_enum DEFAULT 'WAITING'
        )
        `);

        await queryRunner.query(`
        ALTER TABLE "enrollment"
        ADD CONSTRAINT "FK_user"
        FOREIGN KEY ("user_id")
        REFERENCES "user"("id");
        `);

        await queryRunner.query(`
        ALTER TABLE "enrollment"
        ADD CONSTRAINT "FK_course"
        FOREIGN KEY ("course_id")
        REFERENCES "courses"("course_id");
        `);
    };



    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        ALTER TABLE "enrollment"
        DROP CONSTRAINT "FK_user";
        `);

        await queryRunner.query(`
        ALTER TABLE "enrollment"
        DROP CONSTRAINT "FK_course";
        `);


        await queryRunner.query(`
            DROP TABLE IF EXISTS "enrollments";
            DROP TYPE IF EXISTS "enrollment_status_enum";
        `);
    }

}
