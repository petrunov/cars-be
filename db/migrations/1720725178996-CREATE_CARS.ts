import { MigrationInterface, QueryRunner } from 'typeorm';

export class CREATECARS1720725178996 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`cars\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`make\` VARCHAR(50) NOT NULL,
        \`model\` VARCHAR(50) NOT NULL,
        \`year\` INT NOT NULL,
        \`engine\` VARCHAR(50) NOT NULL,
        \`type\` VARCHAR(50) NOT NULL,
        \`gearbox\` VARCHAR(50) NOT NULL,
        \`condition\` VARCHAR(50) NOT NULL,
        \`hp\` INT NOT NULL,
        \`color\` VARCHAR(50) NOT NULL,
        \`price\` DECIMAL(10, 2) NOT NULL,
        \`city\` VARCHAR(50) NOT NULL,
        \`mileage\` VARCHAR(50) NOT NULL,
        \`extras\` TEXT,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`cars\``);
  }
}
