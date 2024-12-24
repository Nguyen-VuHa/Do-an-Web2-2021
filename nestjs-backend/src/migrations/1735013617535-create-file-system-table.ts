import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFileSystemTable1735013617535 implements MigrationInterface {
  name = 'CreateFileSystemTable1735013617535';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."file_systems_type_enum" AS ENUM('folder', 'file')`
    );
    await queryRunner.query(
      `CREATE TABLE "file_systems" ("file_system_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "type" "public"."file_systems_type_enum" NOT NULL, "size" bigint, "mime_type" character varying(255), "path" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "parent_file_system_id" uuid, CONSTRAINT "UQ_1cd253880fb338d2d807acacf20" UNIQUE ("name"), CONSTRAINT "PK_a273dd0759979bdd9725f3e3ccc" PRIMARY KEY ("file_system_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "file_systems" ADD CONSTRAINT "FK_53bd13a92ef333b38f201e5cc51" FOREIGN KEY ("parent_file_system_id") REFERENCES "file_systems"("file_system_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file_systems" DROP CONSTRAINT "FK_53bd13a92ef333b38f201e5cc51"`
    );
    await queryRunner.query(`DROP TABLE "file_systems"`);
    await queryRunner.query(`DROP TYPE "public"."file_systems_type_enum"`);
  }
}
