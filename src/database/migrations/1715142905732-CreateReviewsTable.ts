import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReviewsTable1715142905732 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "review";
            CREATE TABLE "review" (
            "review_id" serial PRIMARY KEY NOT NULL,
            "user_id" int NOT NULL,
            "course_id" int NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NULL
        )
        `);

        await queryRunner.query(`
        ALTER TABLE "review"
        ADD CONSTRAINT "FK_user"
        FOREIGN KEY ("user_id")
        REFERENCES "user"("id");
        `);

        await queryRunner.query(`
        ALTER TABLE "review"
        ADD CONSTRAINT "FK_course"
        FOREIGN KEY ("course_id")
        REFERENCES "courses"("course_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "review"
        DROP CONSTRAINT "FK_user";
        `);

        await queryRunner.query(`
        ALTER TABLE "review"
        DROP CONSTRAINT "FK_course";
        `);


        await queryRunner.query(`
            DROP TABLE IF EXISTS "review";
        `);
    }
}
