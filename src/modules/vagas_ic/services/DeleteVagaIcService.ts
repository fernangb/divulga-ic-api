import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

@injectable()
class DeleteVagaIcService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const vagaIc = await this.vagasIcRepository.encontrarPeloId(id);

    if (!vagaIc) {
      throw new AppError('Vaga IC não encontrada.');
    }

    await this.vagasIcRepository.delete(id);
  }
}

export default DeleteVagaIcService;
