import IAlunosRepository from '@modules/alunos/repositories/IAlunosRepository';
import VagaIc from '@modules/vagas_ic/infra/typeorm/entities/VagaIC';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

interface IRequest {
  usuarioId: string;
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

  public async execute({ usuarioId }: IRequest): Promise<VagaIc[]> {
    const aluno = await this.alunosRepository.encontrarPeloIdUsuario(
      usuarioId,
    );
    if (!aluno) {
      throw new AppError('Aluno não encontrado.');
    }

    const inscricoes = await this.inscricoesIcRepository.listarVagasInscritasPeloAluno(
      aluno.id,
    );

    const vagasRecomendadas = await this.vagasIcRepository.encontrarVagasRecomendadasPorAluno(
      {
        cursoId: aluno.cursoId,
      },
    );


    return vagasRecomendadas;
  }
}

export default ListVagasIcRecomendadasService;
