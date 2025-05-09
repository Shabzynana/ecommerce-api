import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746743569678 implements MigrationInterface {
    name = 'Migration1746743569678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ADD "authorizationUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "authorizationUrl"`);
    }

}
