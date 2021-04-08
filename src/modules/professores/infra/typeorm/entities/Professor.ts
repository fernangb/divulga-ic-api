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
import Laboratorio from '@modules/laboratorios/infra/typeorm/entities/Laboratorio';

@Entity('professor')
class Professor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  siape: string;

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
  laboratorioId: string;

  @ManyToOne(() => Laboratorio, l => l.nome, { eager: true })
  @JoinColumn({ name: 'laboratorioId' })
  laboratorio: Laboratorio;

  @CreateDateColumn()
  dtCriacao: Date;

  @UpdateDateColumn()
  dtAtualizacao: Date;
}

export default Professor;
