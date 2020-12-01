import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCursos1606784748887 implements MigrationInterface {

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
              name: 'created_at',
              type: 'timestamp with time zone',
              isNullable: false
            },
            {
              name: 'updated_at',
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
