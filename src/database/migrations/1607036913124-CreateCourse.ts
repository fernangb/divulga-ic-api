import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCourse1607036913124 implements MigrationInterface {



  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'course',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'building_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'schedule',
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

    await queryRunner.createForeignKey('course', new TableForeignKey({
      name: 'CourseBuilding',
      columnNames: ['building_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'building',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('course', 'CourseBuilding');

    await queryRunner.dropTable('course');
  }

}
