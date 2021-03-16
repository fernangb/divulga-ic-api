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
            name: 'vl_bolsa',
            type: 'real',
            default: 0,
          },
          {
            name: 'hr_semana',
            type: 'integer',
            default: 0,
          },
          {
            name: 'cr_minimo',
            type: 'real',
            default: 0,
          },
          {
            name: 'periodo_minimo',
            type: 'integer',
            default: 1,
          },
          {
            name: 'es_aberta',
            type: 'boolean',
            default: true,
          },
          {
            name: 'nr_inscritos',
            type: 'integer',
            default: 0,
          },
          {
            name: 'nr_vagas',
            type: 'integer',
            default: 1,
          },
          {
            name: 'id_laboratorio',
            type: 'uuid',
            isNullable: true,
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
            name: 'id_curso',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'dt_criacao',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'dt_fechamento',
            type: 'timestamp with time zone',
            isNullable: true,
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
      'vaga_ic',
      new TableForeignKey({
        name: 'LaboratorioVaga',
        columnNames: ['id_laboratorio'],
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
        columnNames: ['id_professor'],
        referencedColumnNames: ['id'],
        referencedTableName: 'professor',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'vaga_ic',
      new TableForeignKey({
        name: 'AreaVaga',
        columnNames: ['id_area'],
        referencedColumnNames: ['id'],
        referencedTableName: 'area',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'vaga_ic',
      new TableForeignKey({
        name: 'CursoVaga',
        columnNames: ['id_curso'],
        referencedColumnNames: ['id'],
        referencedTableName: 'curso',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vaga_ic', 'CursoVaga');
    await queryRunner.dropForeignKey('vaga_ic', 'AreaVaga');
    await queryRunner.dropForeignKey('vaga_ic', 'ProfessorVaga');
    await queryRunner.dropForeignKey('vaga_ic', 'LaboratorioVaga');

    await queryRunner.dropTable('vaga_ic');
  }
}
