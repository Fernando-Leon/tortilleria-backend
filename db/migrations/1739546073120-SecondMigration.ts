import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1739546073120 implements MigrationInterface {
    name = 'SecondMigration1739546073120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastname\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastname\``);
    }

}
