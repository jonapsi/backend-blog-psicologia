import type { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDB1777300223577 implements MigrationInterface {
    name = 'UpdateDB1777300223577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "description" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "content" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "content" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "author" character varying(50) NOT NULL`);
    }

}
