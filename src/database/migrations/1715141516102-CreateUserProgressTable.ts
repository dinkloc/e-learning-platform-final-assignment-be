import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserProgressTable1715141516102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS "user_progress";
        CREATE TABLE "user_progress" (
            "user_progress_id" serial PRIMARY KEY NOT NULL,
            "user_id" int NOT NULL,
            "lesson_id" int NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NULL,
            "is_completed" boolean DEFAULT false
        )
        `)

        await queryRunner.query(`
        ALTER TABLE "user_progress"
        ADD CONSTRAINT "FK_user"
        FOREIGN KEY ("user_id")
        REFERENCES "user"("id");
        `);

        await queryRunner.query(`
        ALTER TABLE "user_progress"
        ADD CONSTRAINT "FK_lesson"
        FOREIGN KEY ("lesson_id")
        REFERENCES "lesson"("lesson_id");
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "user_progress"
        DROP CONSTRAINT "FK_user";
        `);

        await queryRunner.query(`
        ALTER TABLE "user_progress"
        DROP CONSTRAINT "FK_lesson";
        `);

        await queryRunner.query(`
            DROP TABLE IF EXISTS "user_progress";
        `);
    }

}
