import { MigrationInterface, QueryRunner } from 'typeorm';

export class Project1645696085610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE projects (
        id          int(11) unsigned NOT NULL AUTO_INCREMENT,
        name        varchar(191)     NOT NULL,
        description varchar(255),
        created_at  datetime(3)      DEFAULT NOW(3),
        updated_at  datetime(3)      DEFAULT NOW(3) ON UPDATE NOW(3),
        PRIMARY KEY (id),
        UNIQUE KEY unq_name (name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE projects;');
  }
}
