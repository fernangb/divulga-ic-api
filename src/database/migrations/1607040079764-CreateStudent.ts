import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateStudent1607040079764 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'student',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'fullName',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'course_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'dre',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'entrySemester',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'actualSemester',
            type: 'integer',
            isNullable: true
          },
          {
            name: 'cr',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ]
      })
    );
    await queryRunner.createForeignKey('student', new TableForeignKey({
      name: 'StudentCourse',
      columnNames: ['course_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'course',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('student', 'StudentCourse');

    await queryRunner.dropTable('student');
  }

}
