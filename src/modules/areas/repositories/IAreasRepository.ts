import Area from '@modules/areas/infra/typeorm/entities/Area';
import ICreateAreaDTO from '../dtos/ICreateAreaDTO';

interface IAreasRepository {
  create(data: ICreateAreaDTO): Promise<Area>;
  index(): Promise<Area[]>;
  encontrarPeloNome(nome: string): Promise<Area | undefined>;
  encontrarPeloId(id: string): Promise<Area | undefined>;
  encontrarPelosNomes(nomes: string[]): Promise<Area[]>;
}

export default IAreasRepository;
