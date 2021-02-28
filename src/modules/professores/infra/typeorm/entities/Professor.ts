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
  id_curso: string;

  @ManyToOne(() => Curso, c => c.nome, { eager: true })
  @JoinColumn({ name: 'id_curso' })
  curso: Curso;

  @Column()
  id_usuario: string;

  @ManyToOne(() => Usuario, u => u.nome, { eager: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column()
  id_laboratorio: string;

  @ManyToOne(() => Laboratorio, l => l.nome, { eager: true })
  @JoinColumn({ name: 'id_laboratorio' })
  laboratorio: Laboratorio;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Professor;
