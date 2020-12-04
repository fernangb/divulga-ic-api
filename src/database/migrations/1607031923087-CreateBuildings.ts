import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateBuildings1607031923087 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'building',
        columns: [
          {
            name: 'id',
            type: 'uuid',
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
            name: 'commonName',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'campus_id',
            type: 'uuid',
            isNullable: true
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

    await queryRunner.createForeignKey('building', new TableForeignKey({
      name: 'BuildingCampus',
      columnNames: ['campus_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'campus',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('building', 'BuildingCampus');

    await queryRunner.dropTable('building');
  }

}
