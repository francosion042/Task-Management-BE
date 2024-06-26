import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTaskColumnsTable1715810056592 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "task_columns"
            (
        "id"                SERIAL               PRIMARY KEY,
        "name"              CHARACTER VARYING    NOT NULL,
        "description"       TEXT,
        "status"            CHARACTER VARYING    DEFAULT 'OPEN',
        "project_id"        INTEGER REFERENCES "projects"("id") ON DELETE CASCADE,
        "created_at"        TIMESTAMP            NOT NULL DEFAULT timezone('UTC', now()),
        "updated_at"        TIMESTAMP            NOT NULL DEFAULT timezone('UTC', now())
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task_columns');
  }
}
