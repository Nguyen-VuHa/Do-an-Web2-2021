import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSystemUserTable1735013425574 implements MigrationInterface {
  name = 'CreateSystemUserTable1735013425574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."system_users_gender_enum" AS ENUM('male', 'female', 'other')`
    );
    await queryRunner.query(
      `CREATE TABLE "system_users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "password" text NOT NULL, "fullname" character varying(100) NOT NULL, "phone_number" character varying(20) NOT NULL, "birth_day" date, "gender" "public"."system_users_gender_enum", "address" character varying(255), "image_url" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_73dff187ed765e8403bf5fc911e" UNIQUE ("email"), CONSTRAINT "PK_6b0265582b638808428cc81ccc6" PRIMARY KEY ("user_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "system_users"`);
    await queryRunner.query(`DROP TYPE "public"."system_users_gender_enum"`);
  }
}
