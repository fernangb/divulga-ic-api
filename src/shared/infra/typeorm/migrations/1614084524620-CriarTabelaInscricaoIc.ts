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
            name: 'vagaIcId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'alunoId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'dtInscricao',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'esAtiva',
            type: 'boolean',
            isNullable: true,
            default: true,
          },
          {
            name: 'esSelecionado',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'dtCriacao',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'dtAtualizacao',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'inscricao_ic',
      new TableForeignKey({
        name: 'VagaInscricao',
        columnNames: ['vagaIcId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vaga_ic',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'inscricao_ic',
      new TableForeignKey({
        name: 'AlunoInscricao',
        columnNames: ['alunoId'],
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
