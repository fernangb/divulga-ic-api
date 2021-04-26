import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

@injectable()
class SelecionarInscricaoAlunoIcService {
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
      inscricao.vagaIcId,
    );

    if (!vaga) throw new AppError('Vaga inexistente.');

    if (!inscricao.esAtiva) throw new AppError('Inscrição já está fechada.');

    if (inscricao.esSelecionado) throw new AppError('Aluno já selecionado.');

    if (vaga.nrSelecionados >= vaga.nrVagas)
      throw new AppError('Todas as vagas já foram preenchidas.');

    await this.inscricoesIcRepository.selecionarAlunoInscrito(inscricao);

    await this.vagasIcRepository.aumentarNumeroAlunosSelecionados(vaga);
  }
}

export default SelecionarInscricaoAlunoIcService;
