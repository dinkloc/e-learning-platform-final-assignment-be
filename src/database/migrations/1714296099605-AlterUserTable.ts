import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserTable1714296099605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" ADD "user_name" varchar(50) NULL;`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" DROP COLUMN "user_name";`);
    }

}
