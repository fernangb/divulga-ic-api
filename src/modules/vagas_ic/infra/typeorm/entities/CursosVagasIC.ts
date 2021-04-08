import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import VagaIC from './VagaIC';
import Curso from '@modules/cursos/infra/typeorm/entities/Curso';

@Entity('cursos_vagas')
class CursosVagasIC {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_vaga: string;

  @ManyToOne(() => VagaIC, vaga => vaga.cursosVagas)
  // @JoinColumn({ name: 'id_vaga' })
  vaga_ic: VagaIC;

  @Column()
  id_curso: string;

  @ManyToOne(() => Curso, curso => curso.id)
  @JoinColumn({ name: 'id_curso' })
  curso: Curso;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default CursosVagasIC;
