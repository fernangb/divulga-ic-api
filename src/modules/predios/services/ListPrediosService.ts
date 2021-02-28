import Predio from '@modules/predios/infra/typeorm/entities/Predio';
import { inject, injectable } from 'tsyringe';
import IPrediosRepository from '../repositories/IPrediosRepository';

@injectable()
class ListPrediosService {
  constructor(
    @inject('PrediosRepository')
    private prediosRepository: IPrediosRepository,
  ) {}

  public async execute(): Promise<Predio[]> {
    const predios = await this.prediosRepository.index();

    return this.prediosRepository.ordenar(predios);
  }
}

export default ListPrediosService;
