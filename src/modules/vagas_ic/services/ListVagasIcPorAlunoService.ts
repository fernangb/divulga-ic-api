import IAlunosRepository from '@modules/alunos/repositories/IAlunosRepository';
import VagaIc from '@modules/vagas_ic/infra/typeorm/entities/VagaIC';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

interface IRequest {
  id_aluno: string;
}

@injectable()
class ListVagasIcService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('AlunosRepository')
    private alunosRepository: IAlunosRepository,
  ) {}

  public async execute({ id_aluno }: IRequest): Promise<VagaIc[]> {
    const aluno = await this.alunosRepository.encontrarPeloId(id_aluno);
    if (!aluno) {
      throw new AppError('Aluno não encontrado');
    }

    return this.vagasIcRepository.encontrarPorAluno({
      id_curso: aluno.id_curso,
    });
  }
}

export default ListVagasIcService;
