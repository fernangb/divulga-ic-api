import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

@Entity('aluno')
class Aluno {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cursoId: string;

  @ManyToOne(() => Curso, c => c.nome, { eager: true })
  @JoinColumn({ name: 'cursoId' })
  curso: Curso;

  @Column()
  usuarioId: string;

  @ManyToOne(() => Usuario, u => u.nome, { eager: true })
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @Column()
  dre: string;

  @Column()
  periodo: number;

  @Column()
  cr?: number;

  @CreateDateColumn()
  dtCriacao: Date;

  @UpdateDateColumn()
  dtAtualizacao: Date;
}

export default Aluno;
