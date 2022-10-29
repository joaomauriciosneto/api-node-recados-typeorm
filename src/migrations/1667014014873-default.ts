import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667014014873 implements MigrationInterface {
    name = 'default1667014014873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recados" ("id" SERIAL NOT NULL, "titulo" text NOT NULL, "descricao" text NOT NULL, "data_criacao" text NOT NULL, "data_atualiza" text NOT NULL, CONSTRAINT "PK_8e1734b73765b3f5413fe13bc3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "email" text, "senha" text, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "recados"`);
    }

}
