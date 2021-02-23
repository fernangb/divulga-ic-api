import { getRepository, Repository } from 'typeorm';
import Area from '@modules/areas/infra/typeorm/entities/Area';
import IAreasRepository from '@modules/areas/repositories/IAreasRepository';
import ICreateAreaDTO from '@modules/areas/dtos/ICreateAreaDTO';

class AreasRepository implements IAreasRepository {
  private ormRepository: Repository<Area>;

  constructor() {
    this.ormRepository = getRepository(Area);
  }

  public async encontrarPeloNome(nome: string): Promise<Area | undefined> {
    const areaEncontrada = await this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return areaEncontrada;
  }

  public async encontrarPeloId(id: string): Promise<Area | undefined> {
    const areaEncontrada = await this.ormRepository.findOne(id);

    return areaEncontrada;
  }

  public async ordenar(areas: Area[]): Promise<Area[]> {
    return areas.sort((a, b) => (a.nome > b.nome ? 1 : -1));
  }

  public async create({ nome }: ICreateAreaDTO): Promise<Area> {
    const area = this.ormRepository.create({ nome });

    await this.ormRepository.save(area);

    return area;
  }

  public async list(): Promise<Area[]> {
    return this.ormRepository.find();
  }
}

export default AreasRepository;
