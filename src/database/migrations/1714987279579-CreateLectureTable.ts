import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLectureTable1714987279579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS "lesson";
        CREATE TABLE "lesson" (
            "lesson_id" serial PRIMARY KEY NOT NULL,
            "section_id" int NOT NULL
        )
        `);

        await queryRunner.query(`
        ALTER TABLE "lesson"
        ADD CONSTRAINT "FK_section"
        FOREIGN KEY ("section_id")
        REFERENCES "section"("section_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            DROP TABLE IF EXISTS "lesson";
        `);


        await queryRunner.query(`
        ALTER TABLE "lesson"
        DROP CONSTRAINT "FK_section";
        `);
    }

}
