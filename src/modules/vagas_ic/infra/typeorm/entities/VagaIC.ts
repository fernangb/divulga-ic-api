import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Professor from '@modules/professores/infra/typeorm/entities/Professor';
import Laboratorio from '@modules/laboratorios/infra/typeorm/entities/Laboratorio';
import Area from '@modules/areas/infra/typeorm/entities/Area';
import Curso from '@modules/cursos/infra/typeorm/entities/Curso';

@Entity('vaga_ic')
class VagaIC {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Area, { cascade: true, eager: true })
  @JoinTable()
  areas: Area[];

  @ManyToMany(() => Curso, { cascade: true, eager: true })
  @JoinTable()
  cursos: Curso[];

  @Column()
  professorId: string;

  @ManyToOne(() => Professor, produto => produto.id, { eager: true })
  @JoinColumn({ name: 'professorId' })
  professor: Professor;

  @Column()
  laboratorioId: string;

  @ManyToOne(() => Laboratorio, laboratorio => laboratorio.nome, {
    eager: true,
  })
  @JoinColumn({ name: 'laboratorioId' })
  laboratorio: Laboratorio;

  @Column()
  nome: string;

  @Column()
  descricao?: string;

  @Column()
  vlBolsa: number;

  @Column()
  hrSemana: number;

  @Column()
  crMinimo: number;

  @Column()
  periodoMinimo: number;

  @Column()
  esAberta: boolean;

  @Column()
  esPreenchida: boolean;

  @Column()
  nrInscritos: number;

  @Column()
  nrSelecionados: number;

  @Column()
  nrVagas: number;

  @CreateDateColumn()
  dtCriacao: Date;

  @CreateDateColumn()
  dtFechamento: Date;

  @UpdateDateColumn()
  dtAtualizacao: Date;
}

export default VagaIC;
