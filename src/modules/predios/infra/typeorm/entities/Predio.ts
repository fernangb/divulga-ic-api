import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Campus from '@modules/campus/infra/typeorm/entities/Campus';

@Entity('predio')
class Predio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_campus: string;

  @ManyToOne(() => Campus, c => c.nome, { eager: true })
  @JoinColumn({ name: 'id_campus' })
  campus: Campus;

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
