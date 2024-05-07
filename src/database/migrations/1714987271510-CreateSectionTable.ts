import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSectionTable1714987271510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS "section";
        CREATE TABLE "enrollment" (
            "section_id" serial PRIMARY KEY NOT NULL,
            "course_id" int NOT NULL
        )
        `);

        await queryRunner.query(`
        ALTER TABLE "section"
        ADD CONSTRAINT "FK_course"
        FOREIGN KEY ("course_id")
        REFERENCES "course"("course_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`
            DROP TABLE IF EXISTS "section";
        `);


        await queryRunner.query(`
        ALTER TABLE "section"
        DROP CONSTRAINT "FK_course";
        `);

    }

}
