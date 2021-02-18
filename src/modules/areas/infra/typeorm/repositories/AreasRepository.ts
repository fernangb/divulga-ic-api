import { getRepository, Repository } from 'typeorm';
import Area from '@modules/areas/infra/typeorm/entities/Area';
import IAreasRepository from '@modules/areas/repositories/IAreasRepository';
import ICreateAreaDTO from '@modules/areas/dtos/ICreateAreaDTO';

class AreasRepository implements IAreasRepository {
  private ormRepository: Repository<Area>;

  constructor() {
    this.ormRepository = getRepository(Area);
  }

  public async procurarPeloNome(nome: string): Promise<Area | undefined> {
    const areaEncontrada = await this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return areaEncontrada;
  }

  public async create({ nome }: ICreateAreaDTO): Promise<Area> {
    const area = this.ormRepository.create({ nome });

    await this.ormRepository.save(area);

    return area;
  }
}

export default AreasRepository;
