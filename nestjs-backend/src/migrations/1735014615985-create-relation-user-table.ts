import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationUserTable1735014615985 implements MigrationInterface {
  name = 'CreateRelationUserTable1735014615985';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_photos_photo_type_enum" AS ENUM('avatar', 'cover-image')`
    );
    await queryRunner.query(
      `CREATE TABLE "user_photos" ("user_photo_id" SERIAL NOT NULL, "image_url" character varying(255), "photo_type" "public"."user_photos_photo_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userUserId" uuid, CONSTRAINT "PK_285ad907bfbce9de392931f810c" PRIMARY KEY ("user_photo_id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."notifications_notify_type_enum" AS ENUM('normal', 'link')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."notifications_notify_status_enum" AS ENUM('unread', 'read', 'interactive')`
    );
    await queryRunner.query(
      `CREATE TABLE "notifications" ("notify_id" SERIAL NOT NULL, "message" character varying(1000) NOT NULL, "notify_type" "public"."notifications_notify_type_enum" NOT NULL, "redirect_url" character varying(255), "image_url" character varying(255), "notify_status" "public"."notifications_notify_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userUserId" uuid, CONSTRAINT "PK_5d3201ed3f94d323a8108ce5ee6" PRIMARY KEY ("notify_id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female', 'other')`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "password" text NOT NULL, "fullname" character varying(100) NOT NULL, "phone_number" character varying(20) NOT NULL, "birth_day" date, "gender" "public"."users_gender_enum", "address" character varying(255), "image_url" character varying(255), "cover_image_url" character varying(255), "balance" bigint DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user_photos" ADD CONSTRAINT "FK_13cc3589e670c8bf0a508d219f1" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "notifications" ADD CONSTRAINT "FK_c5cc52b42fde832d730c437e40f" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notifications" DROP CONSTRAINT "FK_c5cc52b42fde832d730c437e40f"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_photos" DROP CONSTRAINT "FK_13cc3589e670c8bf0a508d219f1"`
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TYPE "public"."notifications_notify_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."notifications_notify_type_enum"`);
    await queryRunner.query(`DROP TABLE "user_photos"`);
    await queryRunner.query(`DROP TYPE "public"."user_photos_photo_type_enum"`);
  }
}
