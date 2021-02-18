import Area from '@modules/areas/infra/typeorm/entities/Area';
import ICreateAreaDTO from '../dtos/ICreateAreaDTO';

interface IAreasRepository {
  create(data: ICreateAreaDTO): Promise<Area>;
  procurarPeloNome(nome: string): Promise<Area | undefined>;
}

export default IAreasRepository;
