import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import VagaIcCursos from '../infra/typeorm/entities/CursosVagasIC';
import IVagaIcCursosRepository from '../repositories/ICursosVagasIcRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

interface IRequest {
  vagaIcId: string;
}

@injectable()
class ListCursosPorVagaIcService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('VagaIcCursosRepository')
    private vagaIcCursosRepository: IVagaIcCursosRepository,
  ) {}

  public async execute({ vagaIcId }: IRequest): Promise<VagaIcCursos[]> {
    const vagaIc = await this.vagasIcRepository.encontrarPeloId(
      vagaIcId,
    );
    if (!vagaIc) {
      throw new AppError('Vaga de IC não encontrada.');
    }

    return this.vagaIcCursosRepository.listarPorVagaIc(vagaIcId);
  }
}

export default ListCursosPorVagaIcService;
