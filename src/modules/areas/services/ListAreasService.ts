import Area from '@modules/areas/infra/typeorm/entities/Area';
import { inject, injectable } from 'tsyringe';
import IAreasRepository from '../repositories/IAreasRepository';

@injectable()
class ListAreasService {
  constructor(
    @inject('AreasRepository')
    private areasRepository: IAreasRepository,
  ) {}

  public async execute(): Promise<Area[]> {
    return await this.areasRepository.index();
  }
}

export default ListAreasService;
