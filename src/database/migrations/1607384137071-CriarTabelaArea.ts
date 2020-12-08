import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CriarTabelaArea1607384137071 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'area',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('area');
  }

}
