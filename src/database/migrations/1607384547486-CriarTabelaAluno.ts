import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CriarTabelaAluno1607384547486 implements MigrationInterface {

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
            default: 'uuid_generate_v4()'
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'id_curso',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'dre',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'periodo_entrada',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'periodo_atual',
            type: 'integer',
            isNullable: true
          },
          {
            name: 'cr',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'senha',
            type: 'varchar',
            isNullable: false
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
        ]
      })
    );
    await queryRunner.createForeignKey('aluno', new TableForeignKey({
      name: 'CursoAluno',
      columnNames: ['id_curso'],
      referencedColumnNames: ['id'],
      referencedTableName: 'curso',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('aluno', 'CursoAluno');

    await queryRunner.dropTable('aluno');
  }

}

