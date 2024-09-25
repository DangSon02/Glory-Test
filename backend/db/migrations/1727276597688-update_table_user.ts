import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableUser1727276597688 implements MigrationInterface {
    name = 'UpdateTableUser1727276597688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_refresh_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`refresh_token\` varchar(255) NOT NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_refresh_token\` ADD CONSTRAINT \`FK_0c9b2b30669d5574c28327a8046\` FOREIGN KEY (\`user_id\`) REFERENCES \`tbl_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_refresh_token\` DROP FOREIGN KEY \`FK_0c9b2b30669d5574c28327a8046\``);
        await queryRunner.query(`DROP TABLE \`tbl_refresh_token\``);
    }

}
