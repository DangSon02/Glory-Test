import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1727271415462 implements MigrationInterface {
    name = 'CreateUserTable1727271415462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`fisrt_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`tbl_user\``);
    }

}
