import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import { inject, injectable } from 'tsyringe';
import Aluno from '../infra/typeorm/entities/Aluno';
import IAlunosRepository from '../repositories/IAlunosRepository';

@injectable()
class ListCursosService {
  constructor(
    @inject('AlunosRepository')
    private alunosRepository: IAlunosRepository,
  ) {}

  public async execute(id_usuario: string): Promise<Aluno | undefined> {
    const aluno = await this.alunosRepository.encontrarPeloIdUsuario(id_usuario);

    console.log(aluno);

    return aluno;
  }
}

export default ListCursosService;
