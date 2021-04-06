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

@Entity('vagas_cursos')
class VagaIcCursos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_vaga: string;

  @ManyToOne(() => VagaIC, v => v.nome, { eager: true })
  @JoinColumn({ name: 'id_vaga' })
  vaga_ic: VagaIC;

  @Column()
  id_curso: string;

  @ManyToOne(() => Curso, c => c.id, { eager: true })
  @JoinColumn({ name: 'id_curso' })
  curso: Curso;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default VagaIcCursos;
