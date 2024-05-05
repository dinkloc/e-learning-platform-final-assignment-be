import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCourseTable1714488949154 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS "course";
        CREATE TABLE "course" (
            course_id serial PRIMARY KEY NOT NULL,
            name varchar(255) NULL,
            description text NULL,
            thumbnail varchar(255) NULL
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS "course";
        `)
    }

}
