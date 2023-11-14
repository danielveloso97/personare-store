import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangePriceCollun1699967023346 implements MigrationInterface {
  name = 'ChangePriceCollun1699967023346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(5,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_464f927ae360106b783ed0b4106" UNIQUE ("slug"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories_products" ("categoriesId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_a94f06f01c4bd657240eb691a06" PRIMARY KEY ("categoriesId", "productsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9b5e4c075ec12ec47589b4ae18" ON "categories_products" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_173891b721ec1083f205278e07" ON "categories_products" ("productsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_products" ADD CONSTRAINT "FK_9b5e4c075ec12ec47589b4ae184" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_products" ADD CONSTRAINT "FK_173891b721ec1083f205278e07b" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories_products" DROP CONSTRAINT "FK_173891b721ec1083f205278e07b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_products" DROP CONSTRAINT "FK_9b5e4c075ec12ec47589b4ae184"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_173891b721ec1083f205278e07"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9b5e4c075ec12ec47589b4ae18"`,
    );
    await queryRunner.query(`DROP TABLE "categories_products"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
