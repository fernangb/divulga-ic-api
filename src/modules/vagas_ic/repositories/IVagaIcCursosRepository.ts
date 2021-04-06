import ICreateVagaIcCursosDTO from '../dtos/ICreateVagaIcCursosDTO';
import VagaIcCursos from '../infra/typeorm/entities/VagaIcCursos';

export default interface IVagaIcCursosRepository {
  create(data: ICreateVagaIcCursosDTO): Promise<VagaIcCursos>;
  delete(id: string): Promise<void>;

  listarPorVagaIc(id_vaga: string): Promise<VagaIcCursos[]>
}
