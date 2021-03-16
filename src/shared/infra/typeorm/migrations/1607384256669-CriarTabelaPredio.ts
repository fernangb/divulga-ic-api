import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export class CriarTabelaPredio1607384256669 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'predio',
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
            isNullable: false,
          },
          {
            name: 'nome_comum',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'endereco',
            type: 'varchar',
            isNullable: false,
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

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('predio');
  }
}
