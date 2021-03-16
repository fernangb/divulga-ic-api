import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('predio')
class Predio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  nome_comum: string;

  @Column()
  endereco: string;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Predio;
