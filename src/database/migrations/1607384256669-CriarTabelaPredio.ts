import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

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
            default: 'uuid_generate_v4()'
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'nome_comum',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'endereco',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'id_campus',
            type: 'uuid',
            isNullable: true
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

    await queryRunner.createForeignKey('predio', new TableForeignKey({
      name: 'CampusPredio',
      columnNames: ['id_campus'],
      referencedColumnNames: ['id'],
      referencedTableName: 'campus',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('predio', 'CampusPredio');

    await queryRunner.dropTable('predio');
  }

}
