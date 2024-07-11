import { MigrationInterface, QueryRunner } from 'typeorm';

export class INSERTCARSDATA1720725828977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`cars\` (\`make\`, \`model\`, \`year\`, \`engine\`, \`type\`, \`gearbox\`, \`condition\`, \`hp\`, \`color\`, \`price\`, \`city\`, \`mileage\`, \`extras\`)
      VALUES
      ('Toyota', 'Corolla', 2020, '2.0L I4', 'Sedan', 'Automatic', 'Used', 150, 'Silver', 15000.00, 'New York', '30,000 miles', 'Leather seats, Sunroof'),
      ('Honda', 'Civic', 2019, '1.8L I4', 'Sedan', 'CVT', 'New', 140, 'Black', 18000.00, 'Los Angeles', '25,000 miles', 'Backup camera, Alloy wheels')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`cars\`
      WHERE \`make\` IN ('Toyota', 'Honda') AND \`model\` IN ('Corolla', 'Civic')`,
    );
  }
}
