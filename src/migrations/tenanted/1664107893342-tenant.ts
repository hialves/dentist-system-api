import { MigrationInterface, QueryRunner } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

// prettier-ignore
export class tenant1664107893342 implements MigrationInterface {
    name = 'tenant1664107893342'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection.options as PostgresConnectionOptions

    await queryRunner.query(`CREATE TABLE "${schema}"."employee" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "document" character varying NOT NULL, "cro" character varying, "photo" character varying, "recoverPasswordToken" character varying, "recoverPasswordTokenExpire" TIMESTAMP, CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "${schema}"."admin" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "photo" character varying, "roleId" integer NOT NULL, "recoverPasswordToken" character varying, "recoverPasswordTokenExpire" TIMESTAMP, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "REL_446fb0cc55eed0065ececcc889" UNIQUE ("roleId"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "${schema}"."permission" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "show" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "${schema}"."role_permission" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "roleId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TYPE "${schema}"."ROLE_SLUG_ENUM" AS ENUM('clinic_owner', 'employee_dentist', 'employee_manager')`);
    await queryRunner.query(`CREATE TABLE "${schema}"."role" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "slug" "${schema}"."ROLE_SLUG_ENUM", CONSTRAINT "UQ_35c9b140caaf6da09cfabb0d675" UNIQUE ("slug"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "${schema}"."employee_clinic" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "employeeId" integer NOT NULL, "clinicId" integer NOT NULL, "roleId" integer, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_EMPLOYEE_CLINIC_EMPLOYEE_ID_CLINIC_ID" UNIQUE ("employeeId", "clinicId"), CONSTRAINT "PK_e7db3d1367ea79e7ad88f22d42d" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "${schema}"."clinic" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "document" character varying(14) NOT NULL, "address" character varying, "icon" character varying, CONSTRAINT "PK_8e97c18debc9c7f7606e311d763" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "${schema}"."procedure_history" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "procedureId" integer NOT NULL, "previousValue" numeric, "newestValue" numeric, CONSTRAINT "PK_9bbaf9a583ff72518f7210b56e2" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "${schema}"."procedure" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "value" numeric NOT NULL, CONSTRAINT "PK_9888785b528492e7539d96e3894" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "${schema}"."client_procedure" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer NOT NULL, "clinicId" integer NOT NULL, "employeeId" integer NOT NULL, "procedureId" integer NOT NULL, "value" numeric NOT NULL, "receivedValue" boolean DEFAULT false, "executed" boolean DEFAULT false, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_79ae5af0b91c58998080fa942cf" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TYPE "${schema}"."EXAM_FILE_TYPE_ENUM" AS ENUM('pdf', 'image')`);
    await queryRunner.query(`CREATE TABLE "${schema}"."exam" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer NOT NULL, "fileUrl" character varying NOT NULL, "fileType" "${schema}"."EXAM_FILE_TYPE_ENUM" NOT NULL, CONSTRAINT "PK_56071ab3a94aeac01f1b5ab74aa" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "${schema}"."client" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "document" character varying(11), "photo" character varying, "phone" character varying, CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "UQ_463cae6774e9b085ca966d89b4f" UNIQUE ("document"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "${schema}"."budget" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer NOT NULL, "clinicId" integer NOT NULL, "employeeId" integer NOT NULL, CONSTRAINT "PK_9af87bcfd2de21bd9630dddaa0e" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "${schema}"."budget_item" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "budgetId" integer NOT NULL, "procedureId" integer NOT NULL, CONSTRAINT "UQ_BUDGET_ITEM_BUDGET_ID_PROCEDURE_ID" UNIQUE ("budgetId", "procedureId"), CONSTRAINT "PK_28827d376580578abe27ada04bb" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "${schema}"."material_category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_f801cc3914e97d9ba4ba87c5d4d" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "${schema}"."material" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "materialCategoryId" integer, CONSTRAINT "PK_0343d0d577f3effc2054cbaca7f" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "${schema}"."admin" ADD CONSTRAINT "FK_ADMIN_ROLE_ID" FOREIGN KEY ("roleId") REFERENCES "${schema}"."role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."role_permission" ADD CONSTRAINT "FK_ROLE_PERMISSION_ROLE_ID" FOREIGN KEY ("roleId") REFERENCES "${schema}"."role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."role_permission" ADD CONSTRAINT "FK_ROLE_PERMISSION_PERMISSION_ID" FOREIGN KEY ("permissionId") REFERENCES "${schema}"."permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."employee_clinic" ADD CONSTRAINT "FK_EMPLOYEE_CLINIC_ROLE_ID" FOREIGN KEY ("roleId") REFERENCES "${schema}"."role"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."employee_clinic" ADD CONSTRAINT "FK_EMPLOYEE_CLINIC_EMPLOYEE_ID" FOREIGN KEY ("employeeId") REFERENCES "${schema}"."employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."employee_clinic" ADD CONSTRAINT "FK_EMPLOYEE_CLINIC_CLINIC_ID" FOREIGN KEY ("clinicId") REFERENCES "${schema}"."clinic"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."procedure_history" ADD CONSTRAINT "FK_PROCEDURE_HISTORY_PROCEDURE_ID" FOREIGN KEY ("procedureId") REFERENCES "${schema}"."procedure"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."client_procedure" ADD CONSTRAINT "FK_CLIENT_PROCEDURE_CLIENT_ID " FOREIGN KEY ("clientId") REFERENCES "${schema}"."client"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."client_procedure" ADD CONSTRAINT "FK_CLIENT_PROCEDURE_CLINIC_ID " FOREIGN KEY ("clinicId") REFERENCES "${schema}"."clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."client_procedure" ADD CONSTRAINT "FK_CLIENT_PROCEDURE_EMPLOYEE_ID " FOREIGN KEY ("employeeId") REFERENCES "${schema}"."employee"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."client_procedure" ADD CONSTRAINT "FK_CLIENT_PROCEDURE_PROCEDURE_ID " FOREIGN KEY ("procedureId") REFERENCES "${schema}"."procedure"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."exam" ADD CONSTRAINT "FK_8c8d251ba1064d82a00d06f217b" FOREIGN KEY ("clientId") REFERENCES "${schema}"."client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "${schema}"."budget" ADD CONSTRAINT "FK_BUDGET_CLIENT_ID" FOREIGN KEY ("clientId") REFERENCES "${schema}"."client"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."budget" ADD CONSTRAINT "FK_BUDGET_CLINIC_ID" FOREIGN KEY ("clinicId") REFERENCES "${schema}"."clinic"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."budget_item" ADD CONSTRAINT "FK_BUDGET_ITEM_BUDGET_ID" FOREIGN KEY ("budgetId") REFERENCES "${schema}"."budget"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."budget_item" ADD CONSTRAINT "FK_BUDGET_ITEM_PROCEDURE_ID" FOREIGN KEY ("procedureId") REFERENCES "${schema}"."procedure"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "${schema}"."material" ADD CONSTRAINT "FK_MATERIAL_MATERIAL_CATEGORY_ID" FOREIGN KEY ("materialCategoryId") REFERENCES "${schema}"."material_category"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection.options as PostgresConnectionOptions
    
    await queryRunner.query(`ALTER TABLE "${schema}"."material" DROP CONSTRAINT "FK_MATERIAL_MATERIAL_CATEGORY_ID"`);
    await queryRunner.query(`ALTER TABLE "${schema}"."budget_item" DROP CONSTRAINT "FK_BUDGET_ITEM_PROCEDURE_ID"`);
    await queryRunner.query(`ALTER TABLE "${schema}"."budget_item" DROP CONSTRAINT "FK_BUDGET_ITEM_BUDGET_ID"`);
    await queryRunner.query(`ALTER TABLE "${schema}"."budget" DROP CONSTRAINT "FK_BUDGET_CLINIC_ID"`);
    await queryRunner.query(`ALTER TABLE "${schema}"."budget" DROP CONSTRAINT "FK_BUDGET_CLIENT_ID"`);
    await queryRunner.query(`ALTER TABLE "${schema}"."exam" DROP CONSTRAINT "FK_8c8d251ba1064d82a00d06f217b"`);
    await queryRunner.query(`ALTER TABLE "${schema}"."client_procedure" DROP CONSTRAINT "FK_CLIENT_PROCEDURE_PROCEDURE_ID "`);
    await queryRunner.query(`ALTER TABLE "${schema}"."client_procedure" DROP CONSTRAINT "FK_CLIENT_PROCEDURE_EMPLOYEE_ID "`);
    await queryRunner.query(`ALTER TABLE "${schema}"."client_procedure" DROP CONSTRAINT "FK_CLIENT_PROCEDURE_CLINIC_ID "`);
    await queryRunner.query(`ALTER TABLE "${schema}"."client_procedure" DROP CONSTRAINT "FK_CLIENT_PROCEDURE_CLIENT_ID "`);
    await queryRunner.query(`ALTER TABLE "${schema}"."procedure_history" DROP CONSTRAINT "FK_PROCEDURE_HISTORY_PROCEDURE_ID"`);
    await queryRunner.query(`ALTER TABLE "${schema}"."employee_clinic" DROP CONSTRAINT "FK_EMPLOYEE_CLINIC_CLINIC_ID"`);
    await queryRunner.query(`ALTER TABLE "${schema}"."employee_clinic" DROP CONSTRAINT "FK_EMPLOYEE_CLINIC_EMPLOYEE_ID"`);
    await queryRunner.query(`ALTER TABLE "${schema}"."employee_clinic" DROP CONSTRAINT "FK_EMPLOYEE_CLINIC_ROLE_ID"`);
    await queryRunner.query(`ALTER TABLE "${schema}"."role_permission" DROP CONSTRAINT "FK_ROLE_PERMISSION_PERMISSION_ID"`);
    await queryRunner.query(`ALTER TABLE "${schema}"."role_permission" DROP CONSTRAINT "FK_ROLE_PERMISSION_ROLE_ID"`);
    await queryRunner.query(`ALTER TABLE "${schema}"."admin" DROP CONSTRAINT "FK_ADMIN_ROLE_ID"`);
    await queryRunner.query(`DROP TABLE "${schema}"."material"`);
    await queryRunner.query(`DROP TABLE "${schema}"."material_category"`);
    await queryRunner.query(`DROP TABLE "${schema}"."budget_item"`);
    await queryRunner.query(`DROP TABLE "${schema}"."budget"`);
    await queryRunner.query(`DROP TABLE "${schema}"."client"`);
    await queryRunner.query(`DROP TABLE "${schema}"."exam"`);
    await queryRunner.query(`DROP TYPE "${schema}"."EXAM_FILE_TYPE_ENUM"`);
    await queryRunner.query(`DROP TABLE "${schema}"."client_procedure"`);
    await queryRunner.query(`DROP TABLE "${schema}"."procedure"`);
    await queryRunner.query(`DROP TABLE "${schema}"."procedure_history"`);
    await queryRunner.query(`DROP TABLE "${schema}"."clinic"`);
    await queryRunner.query(`DROP TABLE "${schema}"."employee_clinic"`);
    await queryRunner.query(`DROP TABLE "${schema}"."role"`);
    await queryRunner.query(`DROP TYPE "${schema}"."ROLE_SLUG_ENUM"`);
    await queryRunner.query(`DROP TABLE "${schema}"."role_permission"`);
    await queryRunner.query(`DROP TABLE "${schema}"."permission"`);
    await queryRunner.query(`DROP TABLE "${schema}"."admin"`);
    await queryRunner.query(`DROP TABLE "${schema}"."employee"`);
  }

}
