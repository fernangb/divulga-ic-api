import Aluno from '@modules/alunos/infra/typeorm/entities/Aluno';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IAlunosRepository from '../repositories/IAlunosRepository';

interface IRequest {
  dre: string;
  periodo: number;
  id_curso: string;
  id_usuario: string;
}

@injectable()
class CreateAlunoService {
  constructor(
    @inject('AlunosRepository')
    private alunosRepository: IAlunosRepository,
  ) {}

  public async execute({
    dre,
    periodo,
    id_curso,
    id_usuario,
  }: IRequest): Promise<Aluno> {
    const alunoEncontrado = await this.alunosRepository.encontrarPeloDRE(dre);

    if (alunoEncontrado) {
      throw new AppError('Aluno já cadastrado.');
    }

    const dreValido = await this.alunosRepository.validarDRE(dre);

    //  Se der erro para criar aluno, deve-se excluir o usuário correspondente.
    if (!dreValido) {
      throw new AppError('DRE inválido.');
    }

    const periodoValido = await this.alunosRepository.validarPeriodo(periodo);

    //  Se der erro para criar aluno, deve-se excluir o usuário correspondente.
    if (!periodoValido) {
      throw new AppError('Período inválido.');
    }

    const aluno = await this.alunosRepository.create({
      periodo,
      dre,
      id_curso,
      id_usuario,
    });

    return aluno;
  }
}

export default CreateAlunoService;
