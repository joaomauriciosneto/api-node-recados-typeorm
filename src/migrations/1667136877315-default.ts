import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667136877315 implements MigrationInterface {
    name = 'default1667136877315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "senha" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recados" DROP COLUMN "data_criacao"`);
        await queryRunner.query(`ALTER TABLE "recados" ADD "data_criacao" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recados" DROP COLUMN "data_atualiza"`);
        await queryRunner.query(`ALTER TABLE "recados" ADD "data_atualiza" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recados" DROP COLUMN "data_atualiza"`);
        await queryRunner.query(`ALTER TABLE "recados" ADD "data_atualiza" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recados" DROP COLUMN "data_criacao"`);
        await queryRunner.query(`ALTER TABLE "recados" ADD "data_criacao" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "senha" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "email" DROP NOT NULL`);
    }

}
