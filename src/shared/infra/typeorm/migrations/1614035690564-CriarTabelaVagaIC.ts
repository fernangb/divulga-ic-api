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
            isNullable: true,
          },
          {
            name: 'hr_semana',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cr_minimo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'periodo_minimo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'es_aberta',
            type: 'boolean',
            isNullable: true,
            default: true,
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
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'dt_fechamento',
            type: 'timestamp',
            isNullable: true,
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
