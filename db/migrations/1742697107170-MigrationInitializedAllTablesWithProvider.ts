import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationInitializedAllTablesWithProvider1742697107170 implements MigrationInterface {
    name = 'MigrationInitializedAllTablesWithProvider1742697107170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`provider\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`description\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`provider\``);
    }

}
