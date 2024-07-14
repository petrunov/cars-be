import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class InitialSetup1720797401829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TABLE users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Hash passwords
    const hashedPasswordJohn = await bcrypt.hash('123', 10);

    // Insert initial data with hashed passwords
    await queryRunner.query(`
      INSERT INTO users (username, password)
      VALUES ('petrunov', '${hashedPasswordJohn}');
    `);

    // Create cars table
    await queryRunner.query(`
      CREATE TABLE cars (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        make VARCHAR(50) NOT NULL,
        model VARCHAR(50) NOT NULL,
        year INT NOT NULL,
        engine VARCHAR(50) NOT NULL,
        type VARCHAR(50) NOT NULL,
        gearbox VARCHAR(50) NOT NULL,
        car_condition VARCHAR(50) NOT NULL,
        hp INT NOT NULL,
        color VARCHAR(50) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        city VARCHAR(50) NOT NULL,
        mileage INT NOT NULL,
        extras TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INT UNSIGNED NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Insert cars data
    await queryRunner.query(`
      INSERT INTO cars (make, model, year, engine, type, gearbox, car_condition, hp, color, price, city, mileage, extras, user_id)
      VALUES 
        ('Mercedes', 'EQA', 2020, 'Electric', 'Sedan', 'Automatic', 'Used', 200, 'red', 25000.00, 'New York', 50000, 'Leather seats, Sunroof', 1);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order
    await queryRunner.query(`DROP TABLE IF EXISTS cars`);
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
}
