import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CriarTabelaLaboratorio1613942087188 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'laboratorio',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'sigla',
            type: 'varchar',
          },
          {
            name: 'sala',
            type: 'varchar',
          },
          {
            name: 'id_predio',
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
      'laboratorio',
      new TableForeignKey({
        name: 'PredioLaboratorio',
        columnNames: ['id_predio'],
        referencedColumnNames: ['id'],
        referencedTableName: 'predio',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('laboratorio', 'PredioLaboratorio');

    await queryRunner.dropTable('laboratorio');
  }
}
