import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Nivel from './Nivel';

@Entity('usuario')
class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_nivel: string;

  @ManyToOne(() => Nivel)
  @JoinColumn({ name: 'id_nivel' })
  nivel: Nivel;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Usuario;
