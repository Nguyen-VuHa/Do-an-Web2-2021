import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationMovieTable1735014437315 implements MigrationInterface {
  name = 'CreateRelationMovieTable1735014437315';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movie_posters" ("movie_poster_id" SERIAL NOT NULL, "poster_url" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "movie_id" uuid, CONSTRAINT "PK_d268a4f82f949ab9694c58a3bf7" PRIMARY KEY ("movie_poster_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "actors" ("actor_id" SERIAL NOT NULL, "actor_name" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_c22bb529b2ffdc4ce76dfb71d15" UNIQUE ("actor_name"), CONSTRAINT "PK_7c1e2dbb201ec71c0324dc5d888" PRIMARY KEY ("actor_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("category_id" SERIAL NOT NULL, "category_name" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_872bff57db2b6fe48c0913d8daa" UNIQUE ("category_name"), CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "directors" ("director_id" SERIAL NOT NULL, "director_name" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_c09e5c2a656d6d0ddee3141a1ea" UNIQUE ("director_name"), CONSTRAINT "PK_8af6932bb33d67f0205b7af8bc2" PRIMARY KEY ("director_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "movies" ("movie_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text NOT NULL, "duration" integer NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "trailer_id" character varying(30) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "director_id" integer, CONSTRAINT "UQ_5aa0bbd146c0082d3fc5a0ad5d8" UNIQUE ("title"), CONSTRAINT "PK_41acfcc57bc2330d74529a9a69b" PRIMARY KEY ("movie_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "movie_actors" ("movie_id" uuid NOT NULL, "actor_id" integer NOT NULL, CONSTRAINT "PK_71385034c67fafe3ebf8748cab9" PRIMARY KEY ("movie_id", "actor_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f6a1b0c5b2996114fe159c6874" ON "movie_actors" ("movie_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a6d6b6d55428c189b0f48e6a01" ON "movie_actors" ("actor_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "movie_categories" ("movie_id" uuid NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_228491b14a2bda5461459ba3e72" PRIMARY KEY ("movie_id", "category_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9a54f0b179807b525748a8321c" ON "movie_categories" ("movie_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b46ca93039a474fe37dbd4c0d3" ON "movie_categories" ("category_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "movie_posters" ADD CONSTRAINT "FK_62a4b3b4c8401fe7772d0a78031" FOREIGN KEY ("movie_id") REFERENCES "movies"("movie_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "movies" ADD CONSTRAINT "FK_f7858d3bc5b00ea8eec379c4d50" FOREIGN KEY ("director_id") REFERENCES "directors"("director_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "movie_actors" ADD CONSTRAINT "FK_f6a1b0c5b2996114fe159c68744" FOREIGN KEY ("movie_id") REFERENCES "movies"("movie_id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "movie_actors" ADD CONSTRAINT "FK_a6d6b6d55428c189b0f48e6a016" FOREIGN KEY ("actor_id") REFERENCES "actors"("actor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "movie_categories" ADD CONSTRAINT "FK_9a54f0b179807b525748a8321c8" FOREIGN KEY ("movie_id") REFERENCES "movies"("movie_id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "movie_categories" ADD CONSTRAINT "FK_b46ca93039a474fe37dbd4c0d3d" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_categories" DROP CONSTRAINT "FK_b46ca93039a474fe37dbd4c0d3d"`
    );
    await queryRunner.query(
      `ALTER TABLE "movie_categories" DROP CONSTRAINT "FK_9a54f0b179807b525748a8321c8"`
    );
    await queryRunner.query(
      `ALTER TABLE "movie_actors" DROP CONSTRAINT "FK_a6d6b6d55428c189b0f48e6a016"`
    );
    await queryRunner.query(
      `ALTER TABLE "movie_actors" DROP CONSTRAINT "FK_f6a1b0c5b2996114fe159c68744"`
    );
    await queryRunner.query(
      `ALTER TABLE "movies" DROP CONSTRAINT "FK_f7858d3bc5b00ea8eec379c4d50"`
    );
    await queryRunner.query(
      `ALTER TABLE "movie_posters" DROP CONSTRAINT "FK_62a4b3b4c8401fe7772d0a78031"`
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_b46ca93039a474fe37dbd4c0d3"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9a54f0b179807b525748a8321c"`);
    await queryRunner.query(`DROP TABLE "movie_categories"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a6d6b6d55428c189b0f48e6a01"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f6a1b0c5b2996114fe159c6874"`);
    await queryRunner.query(`DROP TABLE "movie_actors"`);
    await queryRunner.query(`DROP TABLE "movies"`);
    await queryRunner.query(`DROP TABLE "directors"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "actors"`);
    await queryRunner.query(`DROP TABLE "movie_posters"`);
  }
}
