import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1743084842583 implements MigrationInterface {
    name = 'Initial1743084842583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, \`description\` varchar(70) NOT NULL, UNIQUE INDEX \`IDX_95ff138b88fdd8a7c9ebdb97a3\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, \`password\` varchar(70) NULL, \`profileId\` int NULL, \`statusId\` int NULL, UNIQUE INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`feature\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`description\` varchar(100) NOT NULL, \`route\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_4832be692a2dc63d67e8e93c75\` (\`name\`), UNIQUE INDEX \`IDX_cd3321b2449cb7bb12cf4ffab4\` (\`route\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`canCreate\` tinyint NOT NULL, \`canRead\` tinyint NOT NULL, \`canUpdate\` tinyint NOT NULL, \`canDelete\` tinyint NOT NULL, \`profileId\` int NULL, \`featureId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, \`description\` varchar(70) NOT NULL, UNIQUE INDEX \`IDX_0046bf0859cceb5f1744df2a36\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`provider\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`description\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b1bda35cdb9a2c1b777f5541d87\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_fffa7945e50138103659f6326b7\` FOREIGN KEY (\`statusId\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_08794a7516dbd94b7065408e879\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_d5660ed7086e3991e4a292275e8\` FOREIGN KEY (\`featureId\`) REFERENCES \`feature\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO \`status\` (\`name\`, \`description\`) VALUES ('Activo', 'Activo'), ('Inactivo', 'Inactivo')`);
        await queryRunner.query(`INSERT INTO \`profile\` (\`name\`, \`description\`) VALUES ('Administrador', 'Perfil con todos los permisos')`);
        await queryRunner.query(`INSERT INTO \`users\` (\`name\`, \`password\`, \`profileId\`, \`statusId\`) VALUES ('Administrador', 'admin', (SELECT \`id\` FROM \`profile\` WHERE \`name\` = 'Administrador'), (SELECT \`id\` FROM \`status\` WHERE \`name\` = 'Activo'))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_d5660ed7086e3991e4a292275e8\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_08794a7516dbd94b7065408e879\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_fffa7945e50138103659f6326b7\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b1bda35cdb9a2c1b777f5541d87\``);
        await queryRunner.query(`DROP TABLE \`provider\``);
        await queryRunner.query(`DROP INDEX \`IDX_0046bf0859cceb5f1744df2a36\` ON \`profile\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_cd3321b2449cb7bb12cf4ffab4\` ON \`feature\``);
        await queryRunner.query(`DROP INDEX \`IDX_4832be692a2dc63d67e8e93c75\` ON \`feature\``);
        await queryRunner.query(`DROP TABLE \`feature\``);
        await queryRunner.query(`DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_95ff138b88fdd8a7c9ebdb97a3\` ON \`status\``);
        await queryRunner.query(`DROP TABLE \`status\``);
    }

}
