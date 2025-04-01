import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLink1743531507185 implements MigrationInterface {
    name = 'CreateLink1743531507185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "originalURL" character varying NOT NULL, "encurtadaURL" character varying NOT NULL, "clicks" integer NOT NULL DEFAULT '0', "userId" character varying, "createdAt" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleteAt" TIMESTAMP, CONSTRAINT "UQ_50b37f1a7928fe32db34cabf829" UNIQUE ("encurtadaURL"), CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "link"`);
    }

}
