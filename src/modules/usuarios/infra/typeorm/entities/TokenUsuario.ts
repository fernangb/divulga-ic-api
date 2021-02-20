import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';
import Nivel from '@modules/usuarios/infra/typeorm/entities/Nivel';

@Entity('token_usuario')
class TokenUsuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  id_usuario: string;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default TokenUsuario;
