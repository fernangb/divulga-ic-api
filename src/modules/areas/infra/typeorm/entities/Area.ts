import AreasVagasIC from '@modules/vagas_ic/infra/typeorm/entities/AreasVagasIC';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('area')
class Area {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @OneToMany(() => AreasVagasIC, areasVagas => areasVagas.area)
  @JoinColumn({ name: 'id_area' })
  areasVagas: AreasVagasIC[];

  @CreateDateColumn()
  dt_criacao: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default Area;
