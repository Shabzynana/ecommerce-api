import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746033128387 implements MigrationInterface {
    name = 'Migration1746033128387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" ADD "uuid" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "UQ_a9a66098c2fb758dff713f8d838" UNIQUE ("uuid")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "UQ_a9a66098c2fb758dff713f8d838"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "uuid"`);
    }

}
