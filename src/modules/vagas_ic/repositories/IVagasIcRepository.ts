import ICreateVagaIcDTO from '../dtos/ICreateVagaIcDTO';
import IListVagasIcCriadasPorProfessorDTO from '../dtos/IListVagasIcCriadasPorProfessorDTO';
import IListVagasIcPorAlunoDTO from '../dtos/IListVagasPorAlunoDTO';
import IVerificarVagasExistentesDTO from '../dtos/IVerificarVagasExistentesDTO';
import VagaIc from '../infra/typeorm/entities/VagaIC';

export default interface IVagasIcRepository {
  encontrarVagaExistente({
    nome,
    id_laboratorio,
  }: IVerificarVagasExistentesDTO): Promise<boolean>;
  encontrarVagasRecomendadasPorAluno(
    data: IListVagasIcPorAlunoDTO,
  ): Promise<VagaIc[]>;
  encontrarPeloId(id: string): Promise<VagaIc | undefined>;
  encontrarPeloNome(nome: string): Promise<VagaIc[]>;
  encontrarPeloCurso(id_curso: string): Promise<VagaIc[]>;
  encontrarPeloLaboratorio(id_laboratorio: string): Promise<VagaIc[]>;
  encontrarPelaArea(id_area: string): Promise<VagaIc[]>;

  listarVagasCriadasPeloProfessor({
    id_professor,
  }: IListVagasIcCriadasPorProfessorDTO): Promise<VagaIc[]>;

  ordenarVagasPorRecomendacao(vagas: VagaIc[]): Promise<VagaIc[]>;

  aumentarNumeroInscritos(vaga: VagaIc): Promise<VagaIc>;
  diminuirNumeroInscritos(vaga: VagaIc): Promise<VagaIc>;

  create(data: ICreateVagaIcDTO): Promise<VagaIc>;
  save(vaga: VagaIc): Promise<VagaIc>;
  index(): Promise<VagaIc[]>;
}
