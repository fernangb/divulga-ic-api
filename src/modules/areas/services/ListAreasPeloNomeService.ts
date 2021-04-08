import Area from '@modules/areas/infra/typeorm/entities/Area';
import { inject, injectable } from 'tsyringe';
import IAreasRepository from '../repositories/IAreasRepository';

@injectable()
class ListAreasPeloNomeService {
  constructor(
    @inject('AreasRepository')
    private areasRepository: IAreasRepository,
  ) {}

  public async execute(nomes: string[]): Promise<Area[]> {
    return await this.areasRepository.encontrarPelosNomes(nomes);
  }
}

export default ListAreasPeloNomeService;
