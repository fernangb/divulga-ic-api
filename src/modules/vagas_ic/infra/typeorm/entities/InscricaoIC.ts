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
  vagaIcId: string;

  @ManyToOne(() => VagaIC, v => v.nome, { eager: true })
  @JoinColumn({ name: 'vagaIcId' })
  vaga_ic: VagaIC;

  @Column()
  alunoId: string;

  @ManyToOne(() => Aluno, a => a.id, { eager: true })
  @JoinColumn({ name: 'alunoId' })
  aluno: Aluno;

  @Column()
  es_ativa: boolean;

  @CreateDateColumn()
  dt_inscricao: Date;

  @CreateDateColumn()
  dtCriacao: Date;

  @UpdateDateColumn()
  dtAtualizacao: Date;
}

export default InscricaoIC;
