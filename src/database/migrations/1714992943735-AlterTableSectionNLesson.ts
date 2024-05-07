import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableSectionNLesson1714992943735 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "section" ADD COLUMN "section_name" varchar(255) NULL;
            ALTER TABLE "lesson" ADD COLUMN "lesson_name" varchar(255) NULL;
            ALTER TABLE "lesson" ADD COLUMN "source_video_lesson" varchar(255) NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "section" DROP COLUMN "section_name";
            ALTER TABLE "lesson" DROP COLUMN "lesson_name";
            ALTER TABLE "lesson" DROP COLUMN "source_video_lesson";
        `);
    }

}
