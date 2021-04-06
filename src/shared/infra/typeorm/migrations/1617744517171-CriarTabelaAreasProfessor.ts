import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CriarTabelaAreasProfessor1617744517171 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'areas_professores',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_professor',
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
      'areas_professores',
      new TableForeignKey({
        name: 'Professor',
        columnNames: ['id_professor'],
        referencedColumnNames: ['id'],
        referencedTableName: 'professor',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'areas_professores',
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
    await queryRunner.dropForeignKey('areas_professores', 'Area');
    await queryRunner.dropForeignKey('areas_professores', 'Professor');

    await queryRunner.dropTable('areas_professores');
  }
}
