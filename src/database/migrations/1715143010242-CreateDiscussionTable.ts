import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDiscussionTable1715143010242 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "discussion" (
        "discussion_id" serial PRIMARY KEY NOT NULL,
        "user_id" int NOT NULL,
        "lesson_id" int NOT NULL,
        "message_content" text NULL
        )
        `);

        await queryRunner.query(`
        ALTER TABLE "discussion"
        ADD CONSTRAINT "FK_user"
        FOREIGN KEY ("user_id")
        REFERENCES "user"("id");
        `);

        await queryRunner.query(`
        ALTER TABLE "discussion"
        ADD CONSTRAINT "FK_lesson"
        FOREIGN KEY ("lesson_id")
        REFERENCES "lesson"("lesson_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS "discussion"
        `);

        await queryRunner.query(`
        ALTER TABLE "discussion"
        DROP CONSTRAINT "FK_user";
        `);

        await queryRunner.query(`
        ALTER TABLE "discussion"
        DROP CONSTRAINT "FK_lesson";
        `);
    }
}
