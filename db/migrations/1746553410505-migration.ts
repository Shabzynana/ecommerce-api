import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746553410505 implements MigrationInterface {
    name = 'Migration1746553410505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "street" TO "street_address"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "street_address" TO "street"`);
    }

}
