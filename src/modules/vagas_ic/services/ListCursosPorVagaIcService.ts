import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import VagaIcCursos from '../infra/typeorm/entities/VagaIcCursos';
import IVagaIcCursosRepository from '../repositories/IVagaIcCursosRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

interface IRequest {
  id_vaga: string;
}

@injectable()
class ListCursosPorVagaIcService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('VagaIcCursosRepository')
    private vagaIcCursosRepository: IVagaIcCursosRepository,
  ) {}

  public async execute({ id_vaga }: IRequest): Promise<VagaIcCursos[]> {
    const vagaIc = await this.vagasIcRepository.encontrarPeloId(
      id_vaga,
    );
    if (!vagaIc) {
      throw new AppError('Vaga de IC não encontrada.');
    }

    return this.vagaIcCursosRepository.listarPorVagaIc(id_vaga);
  }
}

export default ListCursosPorVagaIcService;
