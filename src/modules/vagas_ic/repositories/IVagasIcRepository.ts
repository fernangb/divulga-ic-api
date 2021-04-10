import ICreateVagaIcDTO from '../dtos/ICreateVagaIcDTO';
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

  listarVagasCriadasPeloProfessor({
    professorId,
  }: IListVagasIcCriadasPorProfessorDTO): Promise<VagaIc[]>;

  aumentarNumeroInscritos(vaga: VagaIc): Promise<VagaIc>;
  diminuirNumeroInscritos(vaga: VagaIc): Promise<VagaIc>;

  create(data: ICreateVagaIcDTO): Promise<VagaIc>;
  save(vaga: VagaIc): Promise<VagaIc>;
  index(): Promise<VagaIc[]>;
}
