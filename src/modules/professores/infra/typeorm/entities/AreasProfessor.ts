import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Professor from './Professor';
import Area from '@modules/areas/infra/typeorm/entities/Area';

@Entity('areas_professores')
class AreasProfessor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_professor: string;

  @ManyToOne(() => Professor, p => p.id, { eager: true })
  @JoinColumn({ name: 'id_professor' })
  professor: Professor;

  @Column()
  id_area: string;

  @ManyToOne(() => Area, a => a.id, { eager: true })
  @JoinColumn({ name: 'id_area' })
  area: Area;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default AreasProfessor;
