import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Aluno from '../infra/typeorm/entities/Aluno';
import IAlunosRepository from '../repositories/IAlunosRepository';

@injectable()
class ListCursosService {
  constructor(
    @inject('AlunosRepository')
    private alunosRepository: IAlunosRepository,
  ) {}

  public async execute(usuarioId: string): Promise<Aluno | undefined> {
    const aluno = await this.alunosRepository.encontrarPeloIdUsuario(
      usuarioId,
    );

    if (!aluno) throw new AppError('Não existe aluno com o id especificado.');

    return aluno;
  }
}

export default ListCursosService;
