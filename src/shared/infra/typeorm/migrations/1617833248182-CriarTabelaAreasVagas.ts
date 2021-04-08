import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CriarTabelaAreasVagas1617833248182 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'areas_vagas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_vaga',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'id_area',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'dt_criacao',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'dt_atualizacao',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'areas_vagas',
      new TableForeignKey({
        name: 'Vaga',
        columnNames: ['id_vaga'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vaga_ic',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'areas_vagas',
      new TableForeignKey({
        name: 'Area',
        columnNames: ['id_area'],
        referencedColumnNames: ['id'],
        referencedTableName: 'area',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('areas_vagas', 'Area');
    await queryRunner.dropForeignKey('areas_vagas', 'Vaga');

    await queryRunner.dropTable('areas_vagas');
  }
}
