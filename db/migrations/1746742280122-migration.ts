import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746742280122 implements MigrationInterface {
    name = 'Migration1746742280122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "UQ_866ddee0e17d9385b4e3b86851d" UNIQUE ("reference")`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "UQ_c39d78e8744809ece8ca95730e2" UNIQUE ("transactionId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "UQ_c39d78e8744809ece8ca95730e2"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "UQ_866ddee0e17d9385b4e3b86851d"`);
    }

}
