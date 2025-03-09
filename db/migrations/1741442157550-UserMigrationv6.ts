import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigrationv61741442157550 implements MigrationInterface {
    name = 'UserMigrationv61741442157550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'administrador'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    }

}
