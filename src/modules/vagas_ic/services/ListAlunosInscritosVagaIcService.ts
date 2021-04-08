import InscricaoIc from '@modules/vagas_ic/infra/typeorm/entities/InscricaoIC';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

interface IRequest {
  vagaIcId: string;
}

@injectable()
class ListVagasIcRecomendadasService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('InscricoesIcRepository')
    private inscricoesIcRepository: IInscricoesIcRepository,
  ) {}

  public async execute({ vagaIcId }: IRequest): Promise<InscricaoIc[]> {
    const vaga = await this.vagasIcRepository.encontrarPeloId(vagaIcId);

    if (!vaga) {
      throw new AppError('Vaga não encontrada');
    }

    const inscricoes = await this.inscricoesIcRepository.listarAlunosInscritosPorVagaIc(
      vaga.id,
    );

    return inscricoes;
  }
}

export default ListVagasIcRecomendadasService;
