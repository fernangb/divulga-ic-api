import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Campus from '../../../../campus/infra/typeorm/entities/Campus';

@Entity('predio')
class Predio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_campus: string;

  @ManyToOne(() => Campus)
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
