import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CriarTabelaTokensUsuario1613860289165
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'token_usuario',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'token',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'usuarioId',
            type: 'uuid',
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
        foreignKeys: [
          {
            name: 'TokenUsuario',
            referencedTableName: 'usuario',
            referencedColumnNames: ['id'],
            columnNames: ['usuarioId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('token_usuario');
  }
}
