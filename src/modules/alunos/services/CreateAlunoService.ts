import Aluno from '@modules/alunos/infra/typeorm/entities/Aluno';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IAlunoProvider from '../providers/AlunoProvider/models/IAlunoProvider';
import IAlunosRepository from '../repositories/IAlunosRepository';

interface IRequest {
  dre: string;
  periodo: number;
  curso: string;
  usuarioId: string;
}

@injectable()
class CreateAlunoService {
  constructor(
    @inject('AlunosRepository')
    private alunosRepository: IAlunosRepository,

    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,

    @inject('CursosRepository')
    private cursosRepository: ICursosRepository,

    @inject('AlunoProvider')
    private alunoProvider: IAlunoProvider,
  ) {}

  public async execute({
    dre,
    periodo,
    curso,
    usuarioId,
  }: IRequest): Promise<Aluno> {
    if (!usuarioId) {
      await this.usuariosRepository.delete(usuarioId);

      throw new AppError('ID usuário não existe.');
    }

    const alunoEncontrado = await this.alunosRepository.encontrarPeloDRE(dre);

    if (alunoEncontrado) {
      await this.usuariosRepository.delete(usuarioId);

      throw new AppError('Aluno já cadastrado.');
    }

    const dreValido = this.alunoProvider.validarDRE(dre);

    if (!dreValido) {
      await this.usuariosRepository.delete(usuarioId);

      throw new AppError('DRE inválido.');
    }

    const cursoAluno = await this.cursosRepository.encontrarPeloNome(curso);

    if (!cursoAluno) {
      await this.usuariosRepository.delete(usuarioId);

      throw new AppError('Curso inválido.');
    }

    const periodoValido = await this.alunoProvider.validarPeriodo(periodo);

    if (!periodoValido) {
      await this.usuariosRepository.delete(usuarioId);

      throw new AppError('Período inválido.');
    }

    const aluno = await this.alunosRepository.create({
      periodo,
      dre,
      cursoId: cursoAluno.id,
      usuarioId,
    });

    return aluno;
  }
}

export default CreateAlunoService;
