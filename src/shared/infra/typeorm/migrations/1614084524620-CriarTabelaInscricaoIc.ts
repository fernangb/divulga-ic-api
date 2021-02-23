import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CriarTabelaInscricaoIc1614084524620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inscricao_ic',
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
            name: 'id_aluno',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'dt_inscricao',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'es_ativa',
            type: 'boolean',
            isNullable: true,
            default: true,
          },
          {
            name: 'dt_criacao',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'dt_atualizacao',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'inscricao_ic',
      new TableForeignKey({
        name: 'VagaInscricao',
        columnNames: ['id_vaga'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vaga_ic',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'inscricao_ic',
      new TableForeignKey({
        name: 'AlunoInscricao',
        columnNames: ['id_aluno'],
        referencedColumnNames: ['id'],
        referencedTableName: 'aluno',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('inscricao_ic', 'AlunoInscricao');
    await queryRunner.dropForeignKey('inscricao_ic', 'VagaInscricao');

    await queryRunner.dropTable('inscricao_ic');
  }
}
