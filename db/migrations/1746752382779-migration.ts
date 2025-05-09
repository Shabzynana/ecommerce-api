import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746752382779 implements MigrationInterface {
    name = 'Migration1746752382779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "method" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "method" SET NOT NULL`);
    }

}
