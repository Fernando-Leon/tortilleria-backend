import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1741482279931 implements MigrationInterface {
    name = 'InitMigration1741482279931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, \`description\` varchar(70) NOT NULL, UNIQUE INDEX \`IDX_95ff138b88fdd8a7c9ebdb97a3\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, \`password\` varchar(70) NULL, \`role\` varchar(255) NOT NULL DEFAULT 'administrador', \`statusId\` int NULL, UNIQUE INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_fffa7945e50138103659f6326b7\` FOREIGN KEY (\`statusId\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO \`status\` (\`name\`, \`description\`) VALUES ('activo', 'Usuario activo')`);
        await queryRunner.query(`INSERT INTO \`status\` (\`name\`, \`description\`) VALUES ('inactivo', 'Usuario inactivo')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_fffa7945e50138103659f6326b7\``);
        await queryRunner.query(`DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_95ff138b88fdd8a7c9ebdb97a3\` ON \`status\``);
        await queryRunner.query(`DROP TABLE \`status\``);
    }
}
