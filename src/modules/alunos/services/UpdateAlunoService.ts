import Aluno from '@modules/alunos/infra/typeorm/entities/Aluno';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateAlunoDTO from '../dtos/IUpdateAlunoDTO';
import IAlunoProvider from '../providers/AlunoProvider/models/IAlunoProvider';
import IAlunosRepository from '../repositories/IAlunosRepository';

@injectable()
class UpdateAlunoService {
  constructor(
    @inject('AlunosRepository')
    private alunosRepository: IAlunosRepository,

    @inject('CursosRepository')
    private cursosRepository: ICursosRepository,
    @inject('AlunoProvider')
    private alunoProvider: IAlunoProvider,
  ) {}

  public async execute({
    curso,
    dre,
    periodo,
    cr,
    usuarioId,
  }: IUpdateAlunoDTO): Promise<Aluno> {
    if (!usuarioId) {
      throw new AppError('Usuário não encontrado.');
    }

    const aluno = await this.alunosRepository.encontrarPeloIdUsuario(usuarioId);

    if (!aluno) {
      throw new AppError('Aluno não encontrado.');
    }

    if (dre) {
      const dreValido = this.alunoProvider.validarDRE(dre);

      if (!dreValido) {
        throw new AppError('DRE inválido.');
      }

      aluno.dre = dre;
    }

    if (periodo) {
      const periodoValido = this.alunoProvider.validarPeriodo(periodo);

      if (!periodoValido) {
        throw new AppError('Período inválido.');
      }

      aluno.periodo = periodo;
    }

    if (cr) {
      const crValido = this.alunoProvider.validarCR(cr);

      if (!crValido) {
        throw new AppError('CR inválido.');
      }

      aluno.cr = cr;
    }

    console.log('curso: ', curso);

    if (curso) {
      const cursoValido = await this.cursosRepository.encontrarPeloNome(curso);

      console.log('curso valido: ', cursoValido);

      if (!cursoValido) {
        throw new AppError('Curso inválido.');
      }

      console.log('c1: ', aluno.cursoId);
      console.log('c2: ', cursoValido.id);

      aluno.cursoId = cursoValido.id;
      aluno.curso = cursoValido;

      console.log('c3: ', aluno.cursoId);
    }

    return this.alunosRepository.save(aluno);
  }
}

export default UpdateAlunoService;
