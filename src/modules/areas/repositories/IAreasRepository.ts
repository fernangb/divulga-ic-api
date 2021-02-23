import Area from '@modules/areas/infra/typeorm/entities/Area';
import ICreateAreaDTO from '../dtos/ICreateAreaDTO';

interface IAreasRepository {
  create(data: ICreateAreaDTO): Promise<Area>;
  list(): Promise<Area[]>;
  encontrarPeloNome(nome: string): Promise<Area | undefined>;
  encontrarPeloId(id: string): Promise<Area | undefined>;
  ordenar(areas: Area[]): Promise<Area[]>;
}

export default IAreasRepository;
