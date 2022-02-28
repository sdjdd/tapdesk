import { MigrationInterface, QueryRunner } from 'typeorm';

export class categories1646036845480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE categories (
        id          int(11) unsigned NOT NULL AUTO_INCREMENT,
        tenant_id   int(11) unsigned NOT NULL,
        parent_id   int(11) unsigned,
        name        varchar(255)     NOT NULL,
        description varchar(255),
        position    smallint(5) unsigned,
        active      boolean          NOT NULL DEFAULT '1',
        created_at  datetime(3)      NOT NULL DEFAULT NOW(3),
        updated_at  datetime(3)      NOT NULL DEFAULT NOW(3) ON UPDATE NOW(3),
        PRIMARY KEY (id),
        CONSTRAINT fk_tenants_id_categories_tenant_id FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT fk_categories_id_categories_parent_id FOREIGN KEY (parent_id) REFERENCES categories (id) ON DELETE RESTRICT ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE categories;`);
  }
}
