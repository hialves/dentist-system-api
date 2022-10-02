import { MigrationInterface, QueryRunner } from "typeorm";

export class public1664682909514 implements MigrationInterface {
    name = 'public1664682909514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."tenant" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "schemaName" character varying NOT NULL, "schemaExternalRef" character varying NOT NULL, CONSTRAINT "UQ_6f780a3aa4cad19b1b6cf2ef06d" UNIQUE ("schemaExternalRef"), CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."tenant"`);
    }

}
