import VagaIc from '@modules/vagas_ic/infra/typeorm/entities/VagaIC';
import ICreateInscricaoIcDTO from '../dtos/ICreateInscricaoIcDTO';
import InscricaoIc from '../infra/typeorm/entities/InscricaoIC';

export default interface IInscricoesIcRepository {
  create(data: ICreateInscricaoIcDTO): Promise<InscricaoIc>;
  index(): Promise<InscricaoIc[]>;
  delete(id: string): Promise<void>;

  listarVagasInscritasPeloAluno(id_aluno: string): Promise<InscricaoIc[]>;
  encontrarInscricaoExistente(data: ICreateInscricaoIcDTO): Promise<boolean>;
  encontrarPeloId(id: string): Promise<InscricaoIc | undefined>;
  listarAlunosInscritosPorVagaIc(id_vaga: string): Promise<InscricaoIc[]>;
  listarAlunosInscritosPorProfessor(id_vagas: string[]): Promise<InscricaoIc[]>;
}
