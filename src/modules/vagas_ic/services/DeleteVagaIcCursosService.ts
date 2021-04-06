import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IVagaIcCursosRepository from '../repositories/IVagaIcCursosRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

@injectable()
class DeleteInscricaoIcService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('VagaIcCursosRepository')
    private vagaIcCursosRepository: IVagaIcCursosRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const vagaIc = await this.vagasIcRepository.encontrarPeloId(id);

    if (!vagaIc) throw new AppError('Vaga de IC inexistente.');

    await this.vagaIcCursosRepository.delete(id);
  }
}

export default DeleteInscricaoIcService;
