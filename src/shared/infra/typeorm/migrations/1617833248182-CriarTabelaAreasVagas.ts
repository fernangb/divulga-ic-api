import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CriarTabelaAreasVagas1617833248182 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vaga_ic_areas_area',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'vagaIcId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'areaId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'vaga_ic_areas_area',
      new TableForeignKey({
        name: 'Vaga',
        columnNames: ['vagaIcId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vaga_ic',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'vaga_ic_areas_area',
      new TableForeignKey({
        name: 'Area',
        columnNames: ['areaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'area',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vaga_ic_areas_area', 'Area');
    await queryRunner.dropForeignKey('vaga_ic_areas_area', 'Vaga');

    await queryRunner.dropTable('vaga_ic_areas_area');
  }
}
