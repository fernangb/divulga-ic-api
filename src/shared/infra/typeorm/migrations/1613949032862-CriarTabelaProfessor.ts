import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CriarTabelaProfessor1613949032862 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'professor',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'siape',
            type: 'varchar',
          },
          {
            name: 'cursoId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'laboratorioId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'usuarioId',
            type: 'uuid',
            isNullable: true,
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
      'professor',
      new TableForeignKey({
        name: 'LaboratorioProfessor',
        columnNames: ['laboratorioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'laboratorio',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'professor',
      new TableForeignKey({
        name: 'CursoProfessor',
        columnNames: ['cursoId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'curso',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'professor',
      new TableForeignKey({
        name: 'UsuarioProfessor',
        columnNames: ['usuarioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuario',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('professor', 'UsuarioProfessor');

    await queryRunner.dropForeignKey('professor', 'CursoProfessor');

    await queryRunner.dropForeignKey('professor', 'LaboratorioProfessor');

    await queryRunner.dropTable('professor');
  }
}
