import Aluno from '@modules/alunos/infra/typeorm/entities/Aluno';
import IAlunosRepository from '@modules/alunos/repositories/IAlunosRepository';
import ICreateAlunoDTO from '@modules/alunos/dtos/ICreateAlunoDTO';
import { v4 as uuid_v4 } from 'uuid';

class FakeAlunosRepository implements IAlunosRepository {
  private alunos: Aluno[] = [];

  public async encontrarPeloId(id: string): Promise<Aluno | undefined> {
    const alunoEncontrado = this.alunos.find(aluno => aluno.id === id);

    return alunoEncontrado;
  }

  public async encontrarPeloDRE(dre: string): Promise<Aluno | undefined> {
    const alunoEncontrado = this.alunos.find(aluno => aluno.dre === dre);

    return alunoEncontrado;
  }

  public async create({
    dre,
    periodo,
    id_usuario,
    id_curso,
  }: ICreateAlunoDTO): Promise<Aluno> {
    const aluno = new Aluno();

    Object.assign(aluno, { id: uuid_v4(), dre, periodo, id_usuario, id_curso });

    this.alunos.push(aluno);

    return aluno;
  }

  public async save(aluno: Aluno): Promise<Aluno> {
    const indiceAluno = this.alunos.findIndex(u => u.id === aluno.id);

    this.alunos[indiceAluno] = aluno;

    return aluno;
  }
}

export default FakeAlunosRepository;
