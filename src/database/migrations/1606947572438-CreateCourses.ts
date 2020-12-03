import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCourses1606947572438 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'courses',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false
            },
            {
              name: 'building',
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
              type: 'timestamp with time zone',
              isNullable: false
            },
            {
              name: 'updated_at',
              type: 'timestamp with time zone',
              isNullable: false
            }
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('courses');
    }

}
