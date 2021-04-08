import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import VagaIC from './VagaIC';
import Area from '@modules/areas/infra/typeorm/entities/Area';

@Entity('areas_vagas')
class AreasVagasIC {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_vaga: string;

  @ManyToOne(() => VagaIC, vaga => vaga.areasVagas)
  @JoinColumn({ name: 'id_vaga' })
  vaga_ic: VagaIC;

  @Column()
  id_area: string;

  @ManyToOne(() => Area, area => area.areasVagas)
  @JoinColumn({ name: 'id_area' })
  area: Area;

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default AreasVagasIC;
