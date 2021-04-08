import ICreateVagaIcAreasDTO from '../dtos/ICreateVagaIcAreasDTO';
import AreasVagasIC from '../infra/typeorm/entities/AreasVagasIC';

export default interface IAreasVagasIcRepository {
  create(data: ICreateVagaIcAreasDTO): Promise<AreasVagasIC>;
  delete(id: string): Promise<void>;

  listarPorVagaIc(id_vaga: string): Promise<AreasVagasIC[]>
}
