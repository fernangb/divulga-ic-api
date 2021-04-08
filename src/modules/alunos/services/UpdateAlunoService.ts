import Aluno from '@modules/alunos/infra/typeorm/entities/Aluno';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateAlunoDTO from '../dtos/IUpdateAlunoDTO';
import IAlunosRepository from '../repositories/IAlunosRepository';

@injectable()
class UpdateAlunoService {
  constructor(
    @inject('AlunosRepository')
    private alunosRepository: IAlunosRepository,

    @inject('CursosRepository')
    private cursosRepository: ICursosRepository,
  ) {}

  public async execute({
    dre,
    periodo,
    cursoId,
    usuarioId,
    cr,
  }: IUpdateAlunoDTO): Promise<Aluno> {
    if (!usuarioId) {
      throw new AppError('ID usuário não existe.');
    }

    const aluno = await this.alunosRepository.encontrarPeloId(usuarioId);

    if (!aluno) {
      throw new AppError('Aluno não encontrado.');
    }

    if (dre) {
      const dreValido = this.alunosRepository.validarDRE(dre);

      if (!dreValido) {
        throw new AppError('DRE inválido.');
      }

      aluno.dre = dre;
    }

    if (periodo) {
      const periodoValido = this.alunosRepository.validarPeriodo(periodo);

      if (!periodoValido) {
        throw new AppError('Período inválido.');
      }

      aluno.periodo = periodo;
    }

    if (cr) {
      const crValido = this.alunosRepository.validarCR(cr);

      if (!crValido) {
        throw new AppError('CR inválido.');
      }

      aluno.cr = cr;
    }

    if (cursoId) {
      const cursoValido = this.cursosRepository.encontrarPeloId(cursoId);

      if (!cursoValido) {
        throw new AppError('Curso inválido.');
      }

      aluno.cursoId = cursoId;
    }

    return this.alunosRepository.save(aluno);
  }
}

export default UpdateAlunoService;
