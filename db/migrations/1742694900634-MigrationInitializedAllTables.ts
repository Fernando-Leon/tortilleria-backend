import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationInitializedAllTables1742694900634 implements MigrationInterface {
    name = 'MigrationInitializedAllTables1742694900634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`feature\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`description\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_4832be692a2dc63d67e8e93c75\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`canCreate\` tinyint NOT NULL, \`canRead\` tinyint NOT NULL, \`canUpdate\` tinyint NOT NULL, \`canDelete\` tinyint NOT NULL, \`profileId\` int NULL, \`featureId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD UNIQUE INDEX \`IDX_0046bf0859cceb5f1744df2a36\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_08794a7516dbd94b7065408e879\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_d5660ed7086e3991e4a292275e8\` FOREIGN KEY (\`featureId\`) REFERENCES \`feature\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_d5660ed7086e3991e4a292275e8\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_08794a7516dbd94b7065408e879\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP INDEX \`IDX_0046bf0859cceb5f1744df2a36\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_4832be692a2dc63d67e8e93c75\` ON \`feature\``);
        await queryRunner.query(`DROP TABLE \`feature\``);
    }

}
