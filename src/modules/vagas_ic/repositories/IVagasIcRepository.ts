import ICreateVagaIcDTO from '../dtos/ICreateVagaIcDTO';
import IVerificarVagasExistentesDTO from '../dtos/IVerificarVagasExistentesDTO';
import VagaIc from '../infra/typeorm/entities/VagaIC';

export default interface IVagasIcRepository {
  encontrarVagaExistente({
    nome,
    id_laboratorio,
    id_curso,
  }: IVerificarVagasExistentesDTO): Promise<boolean>;
  // encontrarPeloNome(nome: string): Promise<VagaIc[]>;
  // encontrarPeloCurso(id_curso: string): Promise<VagaIc[]>;
  // encontrarPeloLaboratorio(id_laboratorio: string): Promise<VagaIc[]>;
  // encontrarPelaArea(id_laboratorio: string): Promise<VagaIc[]>;

  // aumentarNumeroInscritos(id: string): number;
  // diminuirNumeroInscritos(id: string): number;

  create(data: ICreateVagaIcDTO): Promise<VagaIc>;
  // save(usuario: VagaIc): Promise<VagaIc>;
  list(): Promise<VagaIc[]>;
}
