import Aluno from '@modules/alunos/infra/typeorm/entities/Aluno';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IAlunosRepository from '../repositories/IAlunosRepository';

interface IRequest {
  nome: string;
  email: string;
  senha: string;
  id_nivel: string;
  dre: string;
  periodo: number;
  id_curso: string;
}

@injectable()
class CreateAlunoService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,

    @inject('AlunosRepository')
    private alunosRepository: IAlunosRepository,
  ) {}

  public async execute({
    email,
    senha,
    id_nivel,
    nome,
    dre,
    periodo,
    id_curso,
  }: IRequest): Promise<Aluno> {
    const alunoEncontrado = await this.alunosRepository.encontrarPeloDRE(dre);

    if (alunoEncontrado) {
      throw new AppError('Aluno já cadastrado.');
    }

    try {
      const usuario = await this.usuariosRepository.create({
        nome,
        email,
        senha,
        id_nivel,
      });
    } catch (err) {
      throw new AppError(err);
    }

    const aluno = await this.alunosRepository.create({
      periodo,
      dre,
      id_curso,
      id_usuario: usuario.id,
    });

    return aluno;
  }
}

export default CreateAlunoService;
