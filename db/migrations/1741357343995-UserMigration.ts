import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1741357343994 implements MigrationInterface {
    name = 'CreateUsersTable1741357343994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`userId\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`password\` varchar(70) NULL,
                PRIMARY KEY (\`userId\`),
                UNIQUE INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` (\`name\`)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }
}