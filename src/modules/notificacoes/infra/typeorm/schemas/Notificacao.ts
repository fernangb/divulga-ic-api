import {
  ObjectID,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ObjectIdColumn,
} from 'typeorm';

@Entity('notificacoes')
class Notificacao {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  mensagem: string;

  @Column()
  id_usuario: string;

  @Column({ default: false })
  es_lida: boolean;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Notificacao;
