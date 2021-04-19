import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

@injectable()
class DeleteVagaIcService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('InscricoesIcRepository')
    private inscricoesIcRepository: IInscricoesIcRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const vagaIc = await this.vagasIcRepository.encontrarPeloId(id);

    if (!vagaIc) throw new AppError('Vaga IC não encontrada.');

    if (!vagaIc.esAberta) throw new AppError('Vaga IC já está fechada.');

    await this.inscricoesIcRepository.desativarInscricoes(id);

    await this.vagasIcRepository.fecharVaga(vagaIc);
  }
}

export default DeleteVagaIcService;
