import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigrationv41741441505488 implements MigrationInterface {
    name = 'UserMigrationv41741441505488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, \`description\` varchar(70) NOT NULL, UNIQUE INDEX \`IDX_95ff138b88fdd8a7c9ebdb97a3\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`statusId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_fffa7945e50138103659f6326b7\` FOREIGN KEY (\`statusId\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO \`status\` (name, description) VALUES ('Activo', 'Estadio activo')`);
        await queryRunner.query(`INSERT INTO \`status\` (name, description) VALUES ('Inactivo', 'Estadio inactivo')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_fffa7945e50138103659f6326b7\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`statusId\``);
        await queryRunner.query(`DROP INDEX \`IDX_95ff138b88fdd8a7c9ebdb97a3\` ON \`status\``);
        await queryRunner.query(`DROP TABLE \`status\``);
    }

}
