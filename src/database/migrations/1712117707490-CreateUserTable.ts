import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1712117707490 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS "user"
            DROP TYPE IF EXISTS "user_status_enum"
            CREATE TYPE user_status_enum AS ENUM ("PENDING", "ACTIVE", "BANNED", "DELETED")
            DROP TYPE IF EXISTS "user_gender_enum";
            CREATE TYPE user_gender_enum AS ENUM ('MALE', 'FEMALE', 'OTHER');
            DROP TYPE IF EXISTS "user_role_enum";
            CREATE TYPE user_role_enum AS ENUM ('ADMIN', 'STUDENT');
            CREATE TABLE "user" (
              id serial NOT NULL,
              email varchar(255) NULL,
              password varchar(255) NULL,
              first_name varchar(50) NULL,
              last_name varchar(50) NULL,
              avatar varchar(500) NULL,
              phone_number varchar(15) NULL,
              gender user_gender_enum default 'OTHER',
              role user_role_enum default 'STUDENT',
              status user_status_enum default 'PENDING',
              email_verified boolean default false,
              deleted_at timestamp NULL,
              created_at timestamp default now() NOT NULL,
              updated_at timestamp default now() NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`   
            DROP TABLE IF EXISTS "user";
            DROP TYPE IF EXISTS "user_status_enum";
            DROP TYPE IF EXISTS "user_gender_enum";
            DROP TYPE IF EXISTS "user_role_enum";
        `);
  }
}
