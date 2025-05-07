import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746657035579 implements MigrationInterface {
    name = 'Migration1746657035579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "zipCode" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "zipCode" SET NOT NULL`);
    }

}
