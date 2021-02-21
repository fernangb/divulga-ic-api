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

  public async encontrarPeloDRE(dre: string): Promise<Aluno | undefined> {
    const alunoEncontrado = await this.ormRepository.findOne({
      where: {
        dre,
      },
    });

    return alunoEncontrado;
  }

  public async create({
    dre,
    periodo,
    id_curso,
    id_usuario,
  }: ICreateAlunoDTO): Promise<Aluno> {
    const aluno = this.ormRepository.create({
      dre,
      periodo,
      id_curso,
      id_usuario,
    });

    await this.ormRepository.save(aluno);

    return aluno;
  }

  public async save(aluno: Aluno): Promise<Aluno> {
    return this.ormRepository.save(aluno);
  }
}

export default AlunosRepository;
