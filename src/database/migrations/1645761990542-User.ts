import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1645761990542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE users (
        id int(11) unsigned NOT NULL AUTO_INCREMENT,
        tenant_id  int(11) unsigned NOT NULL,
        username   varchar(191)     NOT NULL,
        password   varchar(255)     NOT NULL,
        email      varchar(191),
        created_at datetime(3)      NOT NULL DEFAULT NOW(3),
        updated_at datetime(3)      NOT NULL DEFAULT NOW(3) ON UPDATE NOW(3),
        PRIMARY KEY (id),
        CONSTRAINT fk_tenants_id FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        UNIQUE KEY unq_tenant_id_username (tenant_id,username)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP TABLE users;');
  }
}
