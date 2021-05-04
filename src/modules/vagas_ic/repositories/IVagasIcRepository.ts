import ICreateVagaIcDTO from '../dtos/ICreateVagaIcDTO';
import IListVagasDisponiveisDTO from '../dtos/IListVagasDisponiveisDTO';
import IListVagasIcCriadasPorProfessorDTO from '../dtos/IListVagasIcCriadasPorProfessorDTO';
import IListVagasIcPorAlunoDTO from '../dtos/IListVagasPorAlunoDTO';
import IVerificarVagasExistentesDTO from '../dtos/IVerificarVagasExistentesDTO';
import VagaIc from '../infra/typeorm/entities/VagaIC';

export default interface IVagasIcRepository {
  encontrarVagaExistente({
    nome,
    laboratorioId,
  }: IVerificarVagasExistentesDTO): Promise<boolean>;
  encontrarVagasRecomendadasPorAluno(
    data: IListVagasIcPorAlunoDTO,
  ): Promise<VagaIc[]>;
  encontrarPeloId(id: string): Promise<VagaIc | undefined>;
  encontrarPeloNome(nome: string): Promise<VagaIc[]>;
  encontrarPeloCurso(cursoId: string): Promise<VagaIc[]>;
  encontrarPeloLaboratorio(laboratorioId: string): Promise<VagaIc[]>;
  encontrarPelaArea(areaId: string): Promise<VagaIc[]>;
  fecharVaga(vaga: VagaIc): Promise<void>;

  listarVagasCriadasPeloProfessor({
    professorId,
  }: IListVagasIcCriadasPorProfessorDTO): Promise<VagaIc[]>;

  listarVagasDisponiveis({
    esAberta,
    esPreenchida,
  }: IListVagasDisponiveisDTO): Promise<VagaIc[]>;

  aumentarNumeroAlunosInscritos(vaga: VagaIc): Promise<VagaIc>;
  diminuirNumeroAlunosInscritos(vaga: VagaIc): Promise<VagaIc>;

  aumentarNumeroAlunosSelecionados(vaga: VagaIc): Promise<VagaIc>;
  diminuirNumeroAlunosSelecionados(vaga: VagaIc): Promise<VagaIc>;

  create(data: ICreateVagaIcDTO): Promise<VagaIc>;
  save(vaga: VagaIc): Promise<VagaIc>;
  index(): Promise<VagaIc[]>;
  delete(id: string): Promise<void>;
}
