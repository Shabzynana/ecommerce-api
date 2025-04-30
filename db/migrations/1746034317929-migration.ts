import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746034317929 implements MigrationInterface {
    name = 'Migration1746034317929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" ADD "expires_in" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "expires_in"`);
    }

}
