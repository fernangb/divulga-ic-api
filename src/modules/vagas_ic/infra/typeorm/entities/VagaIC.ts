import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Professor from '@modules/professores/infra/typeorm/entities/Professor';
import Laboratorio from '@modules/laboratorios/infra/typeorm/entities/Laboratorio';
import CursosVagasIC from './CursosVagasIC';
import AreasVagasIC from './AreasVagasIC';
import Area from '@modules/areas/infra/typeorm/entities/Area';

@Entity('vaga_ic')
class VagaIC {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CursosVagasIC, cursosVagas => cursosVagas.curso)
  @JoinColumn({ name: 'cursos_vagas' })
  cursosVagas: CursosVagasIC[];

  @OneToMany(() => AreasVagasIC, areasVagas => areasVagas.area, {eager: true})
  @JoinColumn({ name: 'area' })
  areasVagas: AreasVagasIC[];

  @Column()
  id_professor: string;

  @ManyToOne(() => Professor, produto => produto.id, { eager: true })
  @JoinColumn({ name: 'id_professor' })
  professor: Professor;

  @Column()
  id_laboratorio: string;

  @ManyToOne(() => Laboratorio, laboratorio => laboratorio.nome, { eager: true })
  @JoinColumn({ name: 'id_laboratorio' })
  laboratorio: Laboratorio;

  @Column()
  nome: string;

  @Column()
  descricao?: string;

  @Column()
  vl_bolsa: number;

  @Column()
  hr_semana: number;

  @Column()
  cr_minimo: number;

  @Column()
  periodo_minimo: number;

  @Column()
  es_aberta: boolean;

  @Column()
  nr_inscritos: number;

  @Column()
  nr_vagas: number;

  @CreateDateColumn()
  dt_criacao: Date;

  @CreateDateColumn()
  dt_fechamento: Date;

  @UpdateDateColumn()
  dt_atualizacao: Date;
}

export default VagaIC;
