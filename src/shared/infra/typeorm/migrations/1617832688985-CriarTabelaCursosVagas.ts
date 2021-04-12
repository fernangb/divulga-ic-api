import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CriarTabelaCursosVagas1617832688985 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vaga_ic_cursos_curso',
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
            name: 'cursoId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'vaga_ic_cursos_curso',
      new TableForeignKey({
        name: 'Vaga',
        columnNames: ['vagaIcId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vaga_ic',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'vaga_ic_cursos_curso',
      new TableForeignKey({
        name: 'Curso',
        columnNames: ['cursoId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'curso',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vaga_ic_cursos_curso', 'Curso');
    await queryRunner.dropForeignKey('vaga_ic_cursos_curso', 'Vaga');

    await queryRunner.dropTable('vaga_ic_cursos_curso');
  }
}
