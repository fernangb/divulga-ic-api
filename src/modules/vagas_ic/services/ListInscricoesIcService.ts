import { inject, injectable } from 'tsyringe';
import InscricaoIC from '../infra/typeorm/entities/InscricaoIC';
import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';

@injectable()
class ListInscricoesIcService {
  constructor(
    @inject('InscricoesIcRepository')
    private inscricoesIcRepository: IInscricoesIcRepository,
  ) {}

  public async execute(): Promise<InscricaoIC[]> {
    return this.inscricoesIcRepository.list();
  }
}

export default ListInscricoesIcService;
