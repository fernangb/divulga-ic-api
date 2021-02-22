import Professor from '@modules/professores/infra/typeorm/entities/Professor';
import IProfessoresRepository from '@modules/professores/repositories/IProfessoresRepository';
import ICreateProfessorDTO from '@modules/professores/dtos/ICreateProfessorDTO';
import { v4 as uuid_v4 } from 'uuid';

class FakeProfessoresRepository implements IProfessoresRepository {
  private professores: Professor[] = [];

  public async encontrarPeloId(id: string): Promise<Professor | undefined> {
    const alunoEncontrado = this.professores.find(aluno => aluno.id === id);

    return alunoEncontrado;
  }

  public async create({
    id_laboratorio,
    id_usuario,
    id_curso,
  }: ICreateProfessorDTO): Promise<Professor> {
    const aluno = new Professor();

    Object.assign(aluno, {
      id: uuid_v4(),
      id_laboratorio,
      id_usuario,
      id_curso,
    });

    this.professores.push(aluno);

    return aluno;
  }

  public async save(aluno: Professor): Promise<Professor> {
    const indiceProfessor = this.professores.findIndex(u => u.id === aluno.id);

    this.professores[indiceProfessor] = aluno;

    return aluno;
  }
}

export default FakeProfessoresRepository;
