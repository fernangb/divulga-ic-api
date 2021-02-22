import Aluno from '@modules/alunos/infra/typeorm/entities/Aluno';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
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

    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({
    dre,
    periodo,
    id_curso,
    id_usuario,
  }: IRequest): Promise<Aluno> {
    if (!id_usuario) {
      await this.usuariosRepository.delete(id_usuario);

      throw new AppError('ID usuário não existe.');
    }

    const alunoEncontrado = await this.alunosRepository.encontrarPeloDRE(dre);

    if (alunoEncontrado) {
      await this.usuariosRepository.delete(id_usuario);

      throw new AppError('Aluno já cadastrado.');
    }

    const dreValido = this.alunosRepository.validarDRE(dre);

    if (!dreValido) {
      await this.usuariosRepository.delete(id_usuario);

      throw new AppError('DRE inválido.');
    }

    const periodoValido = await this.alunosRepository.validarPeriodo(periodo);

    if (!periodoValido) {
      await this.usuariosRepository.delete(id_usuario);

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
