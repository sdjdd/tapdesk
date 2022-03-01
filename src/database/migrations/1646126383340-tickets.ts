import { MigrationInterface, QueryRunner } from 'typeorm';

export class tickets1646126383340 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE tickets (
        id           int(11) unsigned     NOT NULL AUTO_INCREMENT,
        tenant_id    int(11) unsigned     NOT NULL,
        category_id  int(11) unsigned     NOT NULL,
        requester_id int(11) unsigned     NOT NULL,
        assignee_id  int(11) unsigned,
        subject      varchar(255)         NOT NULL DEFAULT '',
        description  text                 NOT NULL DEFAULT '',
        status       smallint(5) unsigned NOT NULL,
        created_at   datetime(3)          NOT NULL DEFAULT NOW(3),
        updated_at   datetime(3)          NOT NULL DEFAULT NOW(3) ON UPDATE NOW(3),
        PRIMARY KEY (id),
        CONSTRAINT fk_tickets_tenant_id_tenants_id FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT fk_tickets_category_id_categories_id FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT fk_tickets_requester_id_users_id FOREIGN KEY (requester_id) REFERENCES users (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT fk_tickets_assignee_id_users_id FOREIGN KEY (assignee_id) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE tickets;');
  }
}
