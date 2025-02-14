import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationToRelationUserWithSex1739548890400 implements MigrationInterface {
    name = 'MigrationToRelationUserWithSex1739548890400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sexs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`mail\` varchar(255) NOT NULL, \`sexId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_96f971661974f93f7e2fd1591d0\` FOREIGN KEY (\`sexId\`) REFERENCES \`sexs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO \`sexs\` (\`name\`, \`description\`) VALUES ('Masculino', 'Sexo masculino - Hombre'), ('Femenino', 'Sexo Femenino - Mujer')`); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_96f971661974f93f7e2fd1591d0\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`sexs\``);
    }

}
