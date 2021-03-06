import ICreateInscricaoIcDTO from '../dtos/ICreateInscricaoIcDTO';
import InscricaoIc from '../infra/typeorm/entities/InscricaoIC';

export default interface IInscricoesIcRepository {
  create(data: ICreateInscricaoIcDTO): Promise<InscricaoIc>;
  index(): Promise<InscricaoIc[]>;
  delete(id: string): Promise<void>;
  update(inscricaoIc: InscricaoIc): Promise<InscricaoIc>;

  ativarInscricoes(vagaId: string): Promise<void>;
  desativarInscricoes(vagaId: string): Promise<void>;
  listarAlunosSelecionados(vagaId: string): Promise<InscricaoIc[]>;
  listarVagasInscritasPeloAluno(alunoId: string): Promise<InscricaoIc[]>;
  listarVagasInscritasAtivasPeloAluno(alunoId: string): Promise<InscricaoIc[]>;
  encontrarInscricaoExistente(data: ICreateInscricaoIcDTO): Promise<boolean>;
  encontrarPeloId(id: string): Promise<InscricaoIc | undefined>;
  listarAlunosInscritosPorVagaIc(vagaIcId: string): Promise<InscricaoIc[]>;
  listarAlunosInscritosPorProfessor(
    vagaIcIds: string[],
  ): Promise<InscricaoIc[]>;
  eliminarAlunoInscrito(inscricaoIc: InscricaoIc): Promise<void>;
  selecionarAlunoInscrito(inscricaoIc: InscricaoIc): Promise<void>;
}
