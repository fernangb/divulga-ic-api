import VagaIc from '@modules/vagas_ic/infra/typeorm/entities/VagaIC';
import { inject, injectable } from 'tsyringe';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

@injectable()
class ListVagasIcService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
  ) {}

  public async execute(): Promise<VagaIc[]> {
    return this.vagasIcRepository.index();
  }
}

export default ListVagasIcService;
