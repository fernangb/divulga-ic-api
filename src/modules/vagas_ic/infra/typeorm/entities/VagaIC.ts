import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import Area from '@modules/areas/infra/typeorm/entities/Area';
import Professor from '@modules/professores/infra/typeorm/entities/Professor';
import Laboratorio from '@modules/laboratorios/infra/typeorm/entities/Laboratorio';

@Entity('vaga_ic')
class VagaIC {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_curso: string;

  @ManyToOne(() => Curso)
  @JoinColumn({ name: 'id_curso' })
  curso: Curso;

  @Column()
  id_area: string;

  @ManyToOne(() => Area)
  @JoinColumn({ name: 'id_area' })
  area: Area;

  @Column()
  id_professor: string;

  @ManyToOne(() => Professor)
  @JoinColumn({ name: 'id_professor' })
  professor: Professor;

  @Column()
  id_laboratorio: string;

  @ManyToOne(() => Laboratorio)
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
