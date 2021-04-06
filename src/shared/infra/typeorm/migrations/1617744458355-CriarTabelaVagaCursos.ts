import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CriarTabelaVagaCursos1617744458355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vagas_cursos',
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
            name: 'dt_atualizacao',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'vagas_cursos',
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
      'vagas_cursos',
      new TableForeignKey({
        name: 'Curso',
        columnNames: ['id_curso'],
        referencedColumnNames: ['id'],
        referencedTableName: 'curso',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vagas_cursos', 'Curso');
    await queryRunner.dropForeignKey('vagas_cursos', 'Vaga');

    await queryRunner.dropTable('vagas_cursos');
  }
}
