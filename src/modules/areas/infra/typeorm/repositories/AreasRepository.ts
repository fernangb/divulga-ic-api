import { getRepository, In, Repository } from 'typeorm';
import Area from '@modules/areas/infra/typeorm/entities/Area';
import IAreasRepository from '@modules/areas/repositories/IAreasRepository';
import ICreateAreaDTO from '@modules/areas/dtos/ICreateAreaDTO';

class AreasRepository implements IAreasRepository {
  private ormRepository: Repository<Area>;

  constructor() {
    this.ormRepository = getRepository(Area);
  }

  public async encontrarPelosNomes(nomes: string[]): Promise<Area[]> {
    return await this.ormRepository.find({ where: {nome: In(nomes)}});
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

  public async create({ nome }: ICreateAreaDTO): Promise<Area> {
    const area = this.ormRepository.create({ nome });

    await this.ormRepository.save(area);

    return area;
  }

  public async index(): Promise<Area[]> {
    return this.ormRepository.find({ order: {
      nome: "ASC"
    }});
  }
}

export default AreasRepository;
