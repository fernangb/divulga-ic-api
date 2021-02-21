import Predio from '@modules/predios/infra/typeorm/entities/Predio';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('laboratorio')
class Laboratorio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_predio: string;

  @ManyToOne(() => Predio)
  @JoinColumn({ name: 'id_predio' })
  predio: Predio;

  @Column()
  nome: string;

  @Column()
  sigla: string;

  @Column()
  sala: string;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Laboratorio;
