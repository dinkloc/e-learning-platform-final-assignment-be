import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableSectionLesson1715237229895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "section" ADD COLUMN "total_minutes_per_section" int NULL;
            ALTER TABLE "lesson" ADD COLUMN "minutes_per_lesson" int NULL;
            ALTER TABLE "courses" ADD COLUMN "author" varchar(255) NULL;
            ALTER TABLE "courses" ADD COLUMN "total_time_course" int NULL; 
            ALTER TABLE "courses" ADD COLUMN "updated_at" timestamp NULL;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "section" DROP COLUMN "total_minutes_per_section";
            ALTER TABLE "lesson" DROP COLUMN "minutes_per_lesson";
            ALTER TABLE "courses" DROP COLUMN "author";
            ALTER TABLE "courses" DROP COLUMN "total_time_course"; 
            ALTER TABLE "courses" DROP COLUMN "updated_at"; 
        `)
    }

}
