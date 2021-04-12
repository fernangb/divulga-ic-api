import VagaIc from '@modules/vagas_ic/infra/typeorm/entities/VagaIC';
import ICreateInscricaoIcDTO from '../dtos/ICreateInscricaoIcDTO';
import InscricaoIc from '../infra/typeorm/entities/InscricaoIC';

export default interface IInscricoesIcRepository {
  create(data: ICreateInscricaoIcDTO): Promise<InscricaoIc>;
  index(): Promise<InscricaoIc[]>;
  delete(id: string): Promise<void>;
  update(inscricaoIc: InscricaoIc): Promise<InscricaoIc>;
  ativarInscricoes(vagaId: string): Promise<void>;
  desativarInscricoes(vagaId: string): Promise<void>;

  listarVagasInscritasPeloAluno(alunoId: string): Promise<InscricaoIc[]>;
  encontrarInscricaoExistente(data: ICreateInscricaoIcDTO): Promise<boolean>;
  encontrarPeloId(id: string): Promise<InscricaoIc | undefined>;
  listarAlunosInscritosPorVagaIc(vagaIcId: string): Promise<InscricaoIc[]>;
  listarAlunosInscritosPorProfessor(vagaIcIds: string[]): Promise<InscricaoIc[]>;
}
