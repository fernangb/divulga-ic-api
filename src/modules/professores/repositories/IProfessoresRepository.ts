import ICreateProfessorDTO from '../dtos/ICreateProfessorDTO';
import Professor from '../infra/typeorm/entities/Professor';

export default interface IProfessorsRepository {
  encontrarPeloId(id: string): Promise<Professor | undefined>;
  create(data: ICreateProfessorDTO): Promise<Professor>;
  save(usuario: Professor): Promise<Professor>;
}
