import ICreateProfessorDTO from '../dtos/ICreateProfessorDTO';
import Professor from '../infra/typeorm/entities/Professor';

export default interface IProfessorsRepository {
  encontrarPeloId(id: string): Promise<Professor | undefined>;
  encontrarPeloIdUsuario(usuarioId: string): Promise<Professor | undefined>;
  encontrarPeloSIAPE(siape: string): Promise<Professor | undefined>;
  create(data: ICreateProfessorDTO): Promise<Professor>;
  save(professor: Professor): Promise<Professor>;
}
