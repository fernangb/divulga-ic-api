import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Predio from '@modules/predios/infra/typeorm/entities/Predio';

@Entity('curso')
class Curso {
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
  endereco: string;

  @Column()
  nrPeriodos: number;

  @Column()
  turno: 'Integral' | 'Noturno';

  @Column()
  tipo: 'Bacharel' | 'Licenciatura';

  @CreateDateColumn()
  dtCriacao: Date;

  @UpdateDateColumn()
  dtAtualizacao: Date;
}

export default Curso;
