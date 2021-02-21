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
  id_curso: string;

  @ManyToOne(() => Curso)
  @JoinColumn({ name: 'id_curso' })
  curso: Curso;

  @Column()
  id_usuario: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column()
  dre: string;

  @Column()
  periodo: number;

  @Column()
  cr?: number;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Aluno;
