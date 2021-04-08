import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Nivel from '@modules/usuarios/infra/typeorm/entities/Nivel';

import { Exclude, Expose } from 'class-transformer';

@Entity('usuario')
class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nivelId: string;

  @ManyToOne(() => Nivel, n => n.nome, { eager: true })
  @JoinColumn({ name: 'nivelId' })
  nivel: Nivel;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  senha: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  dtCriacao: Date;

  @UpdateDateColumn()
  dtAtualizacao: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarURL(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;
  }
}

export default Usuario;
