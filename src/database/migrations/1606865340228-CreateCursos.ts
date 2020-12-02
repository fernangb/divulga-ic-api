import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCursos1606865340228 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cursos',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'predio',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'endereco',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'dt_criacao',
            type: 'timestamp with time zone',
            isNullable: false
          },
          {
            name: 'dt_atualizacao',
            type: 'timestamp with time zone',
            isNullable: false
          }
        ]
      })
    );
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('cursos');
    }

}
