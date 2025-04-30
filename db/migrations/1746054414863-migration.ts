import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746054414863 implements MigrationInterface {
    name = 'Migration1746054414863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "expires_in"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "expires_in" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "expires_in"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "expires_in" integer NOT NULL`);
    }

}
