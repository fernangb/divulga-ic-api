import IAlunosRepository from '@modules/alunos/repositories/IAlunosRepository';
import VagaIc from '@modules/vagas_ic/infra/typeorm/entities/VagaIC';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

interface IRequest {
  id_aluno: string;
}

@injectable()
class ListVagasIcRecomendadasService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('AlunosRepository')
    private alunosRepository: IAlunosRepository,
    @inject('InscricoesIcRepository')
    private inscricoesIcRepository: IInscricoesIcRepository,
  ) {}

  public async execute({ id_aluno }: IRequest): Promise<VagaIc[]> {
    const aluno = await this.alunosRepository.encontrarPeloId(id_aluno);
    if (!aluno) {
      throw new AppError('Aluno não encontrado');
    }

    const inscricoes = await this.inscricoesIcRepository.listarVagasInscritasPeloAluno(
      aluno.id,
    );

    const vagasTotais = await this.vagasIcRepository.encontrarVagasRecomendadasPorAluno(
      {
        id_curso: aluno.id_curso,
      },
    );

    const vagasRecomendadas = vagasTotais.filter(vaga => {
      return !inscricoes.map(inscricao => inscricao.id_vaga).includes(vaga.id);
    });

    return vagasRecomendadas;
  }
}

export default ListVagasIcRecomendadasService;
