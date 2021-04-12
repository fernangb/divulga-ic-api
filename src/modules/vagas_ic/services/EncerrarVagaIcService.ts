import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

@injectable()
class EncerrarVagaIcService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('InscricoesIcRepository')
    private inscricoesIcRepository: IInscricoesIcRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const vagaIc = await this.vagasIcRepository.encontrarPeloId(id);

    if (!vagaIc) {
      throw new AppError('Vaga IC não encontrada.');
    }

    if(!vagaIc.esAberta)
      throw new AppError('Vaga IC já está fechada.');

      vagaIc.esAberta = false;

    await this.inscricoesIcRepository.desativarInscricoes(vagaIc.id);

    await this.vagasIcRepository.save(vagaIc);
  }
}

export default EncerrarVagaIcService;
