import { getRepository, Repository } from 'typeorm';
import Aluno from '@modules/alunos/infra/typeorm/entities/Aluno';
import IAlunosRepository from '@modules/alunos/repositories/IAlunosRepository';
import ICreateAlunoDTO from '@modules/alunos/dtos/ICreateAlunoDTO';

class AlunosRepository implements IAlunosRepository {
  private ormRepository: Repository<Aluno>;

  constructor() {
    this.ormRepository = getRepository(Aluno);
  }

  public async encontrarPeloId(id: string): Promise<Aluno | undefined> {
    const alunoEncontrado = await this.ormRepository.findOne(id);

    return alunoEncontrado;
  }

  public async encontrarPeloIdUsuario(
    usuarioId: string,
  ): Promise<Aluno | undefined> {
    const alunoEncontrado = await this.ormRepository.findOne({
      where: {
        usuarioId,
      },
    });

    return alunoEncontrado;
  }

  public async encontrarPeloDRE(dre: string): Promise<Aluno | undefined> {
    const alunoEncontrado = await this.ormRepository.findOne({
      where: {
        dre,
      },
    });

    return alunoEncontrado;
  }

  public validarDRE(dre: string): boolean {
    if (dre.length !== 9) {
      return false;
    }

    // eslint-disable-next-line radix
    const dreInt = parseInt(dre);

    if (!dreInt) {
      return false;
    }

    return true;
  }

  public validarPeriodo(periodo: number): boolean {
    if (periodo < 1 || periodo > 20) {
      return false;
    }

    return true;
  }

  public validarCR(cr: number): boolean {
    if (cr < 0 || cr > 10) {
      return false;
    }

    return true;
  }

  public async create({
    dre,
    periodo,
    cursoId,
    usuarioId,
  }: ICreateAlunoDTO): Promise<Aluno> {
    const aluno = this.ormRepository.create({
      dre,
      periodo,
      cursoId,
      usuarioId,
    });

    await this.ormRepository.save(aluno);

    return aluno;
  }

  public async save(aluno: Aluno): Promise<Aluno> {
    return this.ormRepository.save(aluno);
  }
}

export default AlunosRepository;
