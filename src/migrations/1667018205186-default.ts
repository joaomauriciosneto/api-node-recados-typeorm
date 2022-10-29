import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667018205186 implements MigrationInterface {
    name = 'default1667018205186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recados" DROP CONSTRAINT "FK_d59e2e593816f6586ff7de7a44a"`);
        await queryRunner.query(`ALTER TABLE "recados" RENAME COLUMN "id_recado" TO "id_usuario"`);
        await queryRunner.query(`ALTER TABLE "recados" ADD CONSTRAINT "FK_3c6f87ee01e18d37b1466388a6f" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recados" DROP CONSTRAINT "FK_3c6f87ee01e18d37b1466388a6f"`);
        await queryRunner.query(`ALTER TABLE "recados" RENAME COLUMN "id_usuario" TO "id_recado"`);
        await queryRunner.query(`ALTER TABLE "recados" ADD CONSTRAINT "FK_d59e2e593816f6586ff7de7a44a" FOREIGN KEY ("id_recado") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
