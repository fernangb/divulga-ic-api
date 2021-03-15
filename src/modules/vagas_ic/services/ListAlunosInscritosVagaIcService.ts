import InscricaoIc from '@modules/vagas_ic/infra/typeorm/entities/InscricaoIC';
import IAlunosRepository from '@modules/alunos/repositories/IAlunosRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

interface IRequest {
  id_vaga: string;
}

@injectable()
class ListVagasIcRecomendadasService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('InscricoesIcRepository')
    private inscricoesIcRepository: IInscricoesIcRepository,
  ) {}

  public async execute({ id_vaga }: IRequest): Promise<InscricaoIc[]> {
    const vaga = await this.vagasIcRepository.encontrarPeloId(id_vaga);

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
