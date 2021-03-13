import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

@injectable()
class DeleteInscricaoIcService {
  constructor(
    @inject('InscricoesIcRepository')
    private inscricoesIcRepository: IInscricoesIcRepository,
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const inscricao = await this.inscricoesIcRepository.encontrarPeloId(id);

    if (!inscricao) throw new AppError('Inscrição inexistente.');

    const vaga = await this.vagasIcRepository.encontrarPeloId(
      inscricao.id_vaga,
    );

    if (!vaga) throw new AppError('Vaga inexistente.');

    await this.vagasIcRepository.diminuirNumeroInscritos(vaga);

    await this.inscricoesIcRepository.delete(id);
  }
}

export default DeleteInscricaoIcService;
