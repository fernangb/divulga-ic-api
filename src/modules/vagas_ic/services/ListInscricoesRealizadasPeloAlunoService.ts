import IAlunosRepository from '@modules/alunos/repositories/IAlunosRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import InscricaoIC from '../infra/typeorm/entities/InscricaoIC';
import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';

interface IRequest {
  id_usuario: string;
}

@injectable()
class ListInscricoesRealizadasPeloAlunoService {
  constructor(
    @inject('AlunosRepository')
    private alunosRepository: IAlunosRepository,
    @inject('InscricoesIcRepository')
    private inscricoesIcRepository: IInscricoesIcRepository,
  ) {}

  public async execute({ id_usuario }: IRequest): Promise<InscricaoIC[]> {
    const aluno = await this.alunosRepository.encontrarPeloIdUsuario(
      id_usuario,
    );
    if (!aluno) {
      throw new AppError('Aluno não encontrado');
    }

    return this.inscricoesIcRepository.listarVagasInscritasPeloAluno(aluno.id);
  }
}

export default ListInscricoesRealizadasPeloAlunoService;
