import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CriarTabelaAluno1613923142406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'aluno',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'dre',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'periodo',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'cr',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'cursoId',
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
      'aluno',
      new TableForeignKey({
        name: 'CursoAluno',
        columnNames: ['cursoId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'curso',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'aluno',
      new TableForeignKey({
        name: 'UsuarioAluno',
        columnNames: ['usuarioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuario',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('aluno', 'UsuarioAluno');

    await queryRunner.dropForeignKey('aluno', 'CursoAluno');

    await queryRunner.dropTable('aluno');
  }
}
