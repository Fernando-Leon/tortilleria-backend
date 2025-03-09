import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationWithFixAssetsAndAssetCategories1740010093402 implements MigrationInterface {
    name = 'MigrationWithFixAssetsAndAssetCategories1740010093402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`asset_categories\` (\`categoryId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fixed_assets\` (\`assetId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`serialNumber\` varchar(255) NOT NULL, \`brand\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`purchaseDate\` datetime NOT NULL, \`purchaseValue\` int NOT NULL, \`usefulLife\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`notes\` varchar(255) NOT NULL, \`assetCategoryId\` int NOT NULL, PRIMARY KEY (\`assetId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` ADD CONSTRAINT \`FK_fb82fbcff19cb65dfacaf4ac05a\` FOREIGN KEY (\`assetCategoryId\`) REFERENCES \`asset_categories\`(\`categoryId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fixed_assets\` DROP FOREIGN KEY \`FK_fb82fbcff19cb65dfacaf4ac05a\``);
        await queryRunner.query(`DROP TABLE \`fixed_assets\``);
        await queryRunner.query(`DROP TABLE \`asset_categories\``);
    }

}
