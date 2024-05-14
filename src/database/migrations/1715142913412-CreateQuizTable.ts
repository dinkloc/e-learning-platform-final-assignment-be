import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuizTable1715142913412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "quiz";
            CREATE TABLE "quiz" (
                "quiz_id" serial PRIMARY KEY NOT NULL,
                "lesson_id" NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NULL
            )
        `)

        await queryRunner.query(`
        ALTER TABLE "quiz"
        ADD CONSTRAINT "FK_lesson"
        FOREIGN KEY ("lesson_id")
        REFERENCES "lesson"("lesson_id");
        `);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        ALTER TABLE "quiz"
        DROP CONSTRAINT "FK_lesson";
        `);

        await queryRunner.query(`
        DROP TABLE IF EXISTS "quiz"
        `)
    }

}
