import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

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
            default: 'uuid_generate_v4()'
          },
          {
            name: 'id_predio',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'endereco',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'tipo',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'turno',
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

    await queryRunner.createForeignKey('curso', new TableForeignKey({
      name: 'PredioCurso',
      columnNames: ['id_predio'],
      referencedColumnNames: ['id'],
      referencedTableName: 'predio',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('predio', 'PredioCurso');

    await queryRunner.dropTable('predio');
  }

}
