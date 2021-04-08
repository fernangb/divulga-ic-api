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
  predioId: string;

  @ManyToOne(() => Predio, p => p.nome)
  @JoinColumn({ name: 'predioId' })
  predio: Predio;

  @Column()
  nome: string;

  @Column()
  sigla: string;

  @Column()
  sala: string;

  @CreateDateColumn()
  dtCriacao: Date;

  @UpdateDateColumn()
  dtAtualizacao: Date;
}

export default Laboratorio;
