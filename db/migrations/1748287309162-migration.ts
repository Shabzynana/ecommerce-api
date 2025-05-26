import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748287309162 implements MigrationInterface {
    name = 'Migration1748287309162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_orderstatus_enum" AS ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "orderStatus" "public"."orders_orderstatus_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`CREATE TYPE "public"."orders_paystatus_enum" AS ENUM('unpaid', 'paid')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "payStatus" "public"."orders_paystatus_enum" NOT NULL DEFAULT 'unpaid'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "payStatus"`);
        await queryRunner.query(`DROP TYPE "public"."orders_paystatus_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderStatus"`);
        await queryRunner.query(`DROP TYPE "public"."orders_orderstatus_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "status" "public"."orders_status_enum" NOT NULL DEFAULT 'pending'`);
    }

}
