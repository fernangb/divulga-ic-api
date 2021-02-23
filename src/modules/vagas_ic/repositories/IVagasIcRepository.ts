import ICreateVagaIcDTO from '../dtos/ICreateVagaIcDTO';
import VagaIc from '../infra/typeorm/entities/VagaIC';

export default interface IVagasIcRepository {
  // encontrarPeloNome(nome: string): Promise<VagaIc[]>;
  // encontrarPeloCurso(id_curso: string): Promise<VagaIc[]>;
  // encontrarPeloLaboratorio(id_laboratorio: string): Promise<VagaIc[]>;
  // encontrarPelaArea(id_laboratorio: string): Promise<VagaIc[]>;

  create(data: ICreateVagaIcDTO): Promise<VagaIc>;
  // save(usuario: VagaIc): Promise<VagaIc>;
  list(): Promise<VagaIc[]>;
}
