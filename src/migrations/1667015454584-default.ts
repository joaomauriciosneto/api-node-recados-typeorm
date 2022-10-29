import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667015454584 implements MigrationInterface {
    name = 'default1667015454584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recados" ADD "id_recado" integer`);
        await queryRunner.query(`ALTER TABLE "recados" ADD CONSTRAINT "FK_d59e2e593816f6586ff7de7a44a" FOREIGN KEY ("id_recado") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recados" DROP CONSTRAINT "FK_d59e2e593816f6586ff7de7a44a"`);
        await queryRunner.query(`ALTER TABLE "recados" DROP COLUMN "id_recado"`);
    }

}
