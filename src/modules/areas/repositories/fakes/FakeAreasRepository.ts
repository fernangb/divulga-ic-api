import Area from '@modules/areas/infra/typeorm/entities/Area';
import IAreasRepository from '@modules/areas/repositories/IAreasRepository';
import ICreateAreaDTO from '@modules/areas/dtos/ICreateAreaDTO';
import { v4 as uuid_v4 } from 'uuid';

class FakeAreasRepository implements IAreasRepository {
  private areas: Area[] = [];

  public async procurarPeloNome(nome: string): Promise<Area | undefined> {
    const areaEncontrada = this.areas.find(area => area.nome === nome);

    return areaEncontrada;
  }

  public async create({ nome }: ICreateAreaDTO): Promise<Area> {
    const area = new Area();

    Object.assign(area, { id: uuid_v4(), nome });

    this.areas.push(area);

    return area;
  }
}

export default FakeAreasRepository;
