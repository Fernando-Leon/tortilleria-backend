import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationV2UpdateEntityUser1741541841604 implements MigrationInterface {
    name = 'MigrationV2UpdateEntityUser1741541841604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`roleId\` varchar(255) NOT NULL DEFAULT 'administrador'`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, \`description\` varchar(70) NOT NULL, UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`roleId\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO roles (name, description) VALUES ('administrador', 'Administrador del sistema')`);
        await queryRunner.query(`INSERT INTO roles (name, description) VALUES ('usuario', 'Usuario del sistema')`);
        await queryRunner.query(`INSERT INTO roles (name, description) VALUES ('invitado', 'Invitado del sistema')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`roleId\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`roleId\` varchar(255) NOT NULL DEFAULT 'administrador'`);
        await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleId\` \`role\` varchar(255) NOT NULL DEFAULT 'administrador'`);
    }

}
