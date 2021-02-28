import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Aluno from '@modules/alunos/infra/typeorm/entities/Aluno';
import VagaIC from './VagaIC';

@Entity('inscricao_ic')
class InscricaoIC {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_vaga: string;

  @ManyToOne(() => VagaIC, v => v.nome, { eager: true })
  @JoinColumn({ name: 'id_vaga' })
  vaga_ic: VagaIC;

  @Column()
  id_aluno: string;

  @ManyToOne(() => Aluno, a => a.id, { eager: true })
  @JoinColumn({ name: 'id_aluno' })
  aluno: Aluno;

  @Column()
  es_ativa: boolean;

  @CreateDateColumn()
  dt_inscricao: Date;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default InscricaoIC;
