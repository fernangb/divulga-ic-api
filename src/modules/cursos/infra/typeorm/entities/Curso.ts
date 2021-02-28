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
  id_predio: string;

  @ManyToOne(() => Predio)
  @JoinColumn({ name: 'id_predio' })
  predio: Predio;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @Column()
  nr_periodos: number;

  @Column()
  turno: 'Integral' | 'Noturno';

  @Column()
  tipo: 'Bacharel' | 'Licenciatura';

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Curso;
