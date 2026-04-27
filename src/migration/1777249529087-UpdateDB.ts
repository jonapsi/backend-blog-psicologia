import type { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDB1777249529087 implements MigrationInterface {
    name = 'UpdateDB1777249529087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "autores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(50) NOT NULL, "apellido" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8973029e8bb26f72a4738afc834" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying(100), "description" text, "content" character varying(100), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "author" character varying(50) NOT NULL, "autorId" uuid NOT NULL, CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "FK_dba991251ac069ed9f064fbfd1b" FOREIGN KEY ("autorId") REFERENCES "autores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_dba991251ac069ed9f064fbfd1b"`);
        await queryRunner.query(`DROP TABLE "blog"`);
        await queryRunner.query(`DROP TABLE "autores"`);
    }

}
