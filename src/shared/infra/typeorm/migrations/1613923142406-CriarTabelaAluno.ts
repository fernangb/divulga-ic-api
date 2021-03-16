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
            name: 'id_curso',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'id_usuario',
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
      'aluno',
      new TableForeignKey({
        name: 'CursoAluno',
        columnNames: ['id_curso'],
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
        columnNames: ['id_usuario'],
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
