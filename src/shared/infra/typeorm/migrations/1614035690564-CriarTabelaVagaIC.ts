import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CriarTabelaVagaIC1614035690564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vaga_ic',
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
            name: 'descricao',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'vlBolsa',
            type: 'real',
            default: 0,
          },
          {
            name: 'hrSemana',
            type: 'integer',
            default: 0,
          },
          {
            name: 'crMinimo',
            type: 'real',
            default: 0,
          },
          {
            name: 'periodoMinimo',
            type: 'integer',
            default: 1,
          },
          {
            name: 'esAberta',
            type: 'boolean',
            default: true,
          },
          {
            name: 'nrInscritos',
            type: 'integer',
            default: 0,
          },
          {
            name: 'nrVagas',
            type: 'integer',
            default: 1,
          },
          {
            name: 'laboratorioId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'professorId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'dtCriacao',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'dtFechamento',
            type: 'timestamp with time zone',
            isNullable: true,
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
      'vaga_ic',
      new TableForeignKey({
        name: 'LaboratorioVaga',
        columnNames: ['laboratorioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'laboratorio',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'vaga_ic',
      new TableForeignKey({
        name: 'ProfessorVaga',
        columnNames: ['professorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'professor',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vaga_ic', 'ProfessorVaga');
    await queryRunner.dropForeignKey('vaga_ic', 'LaboratorioVaga');

    await queryRunner.dropTable('vaga_ic');
  }
}
