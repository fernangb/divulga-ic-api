import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Curso from '../../../../cursos/infra/typeorm/entities/Curso';

@Entity('aluno')
class Aluno {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_curso: string;

  @ManyToOne(() => Curso)
  @JoinColumn({ name: 'id_curso' })
  curso: Curso;

  @Column()
  nome: string;

  @Column()
  dre: string;

  @Column()
  periodo_entrada: string;

  @Column()
  periodo_atual: number;

  @Column()
  cr: number;

  @Column()
  descricao: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Aluno;
