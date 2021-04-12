import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

@injectable()
class AtivarVagaIcService {
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

    if(vagaIc.esAberta)
      throw new AppError('Vaga IC já está aberta.');

    vagaIc.esAberta = true;

    await this.inscricoesIcRepository.ativarInscricoes(vagaIc.id);

    await this.vagasIcRepository.save(vagaIc);
  }
}

export default AtivarVagaIcService;
