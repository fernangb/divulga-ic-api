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
      inscricao.vagaIcId,
    );

    if (!vaga) throw new AppError('Vaga inexistente.');

    const inscricoesVaga = await this.inscricoesIcRepository.listarAlunosSelecionados(
      vaga.id,
    );

    const inscricaoAlunoSelecionada = inscricoesVaga.find(
      inscricaoVaga => inscricaoVaga.alunoId === inscricao.alunoId,
    );

    if (inscricaoAlunoSelecionada)
      throw new AppError('Aluno já selecionado para a vaga.');

    await this.vagasIcRepository.diminuirNumeroAlunosInscritos(vaga);

    await this.inscricoesIcRepository.delete(id);
  }
}

export default DeleteInscricaoIcService;
