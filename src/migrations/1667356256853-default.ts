import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667356256853 implements MigrationInterface {
    name = 'default1667356256853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recados" DROP COLUMN "data_criacao"`);
        await queryRunner.query(`ALTER TABLE "recados" ADD "data_criacao" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recados" DROP COLUMN "data_atualiza"`);
        await queryRunner.query(`ALTER TABLE "recados" ADD "data_atualiza" date NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recados" DROP COLUMN "data_atualiza"`);
        await queryRunner.query(`ALTER TABLE "recados" ADD "data_atualiza" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recados" DROP COLUMN "data_criacao"`);
        await queryRunner.query(`ALTER TABLE "recados" ADD "data_criacao" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
