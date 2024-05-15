import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasksTable1715810066537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "tasks"
            (
        "id"                SERIAL               PRIMARY KEY,
        "label"             CHARACTER VARYING    NOT NULL,
        "title"             CHARACTER VARYING    NOT NULL,
        "description"       TEXT,
        "status"            CHARACTER VARYING    DEFAULT 'IN PROGRESS',
        "difficulty"        CHARACTER VARYING    DEFAULT 'EASY',
        "priority"          CHARACTER VARYING    DEFAULT 'LOW',
        "duration"          JSONB,
        "project_id"        INTEGER REFERENCES "projects"("id") ON DELETE CASCADE,
        "task_column_id"    INTEGER REFERENCES "task_columns"("id") ON DELETE CASCADE,
        "start_date"        TIMESTAMP,
        "due_date"          TIMESTAMP,
        "created_at"        TIMESTAMP            NOT NULL DEFAULT now(),
        "updated_at"        TIMESTAMP            NOT NULL DEFAULT now()
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
