import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746716870168 implements MigrationInterface {
    name = 'Migration1746716870168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "trackingNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "UQ_763b782b539c971c65f759b49c8" UNIQUE ("trackingNumber")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "UQ_763b782b539c971c65f759b49c8"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "trackingNumber" DROP NOT NULL`);
    }

}
