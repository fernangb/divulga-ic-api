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
    return this.prediosRepository.index();
  }
}

export default ListPrediosService;
