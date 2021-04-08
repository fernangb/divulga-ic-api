import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CriarTabelaCurso1607384380748 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'curso',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'predioId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'endereco',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'nrPeriodos',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'tipo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'turno',
            type: 'varchar',
            isNullable: false,
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
      'curso',
      new TableForeignKey({
        name: 'PredioCurso',
        columnNames: ['predioId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'predio',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('curso', 'PredioCurso');

    await queryRunner.dropTable('curso');
  }
}
