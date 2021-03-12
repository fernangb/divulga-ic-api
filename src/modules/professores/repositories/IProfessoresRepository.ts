import ICreateProfessorDTO from '../dtos/ICreateProfessorDTO';
import Professor from '../infra/typeorm/entities/Professor';

export default interface IProfessorsRepository {
  encontrarPeloId(id: string): Promise<Professor | undefined>;
  encontrarPeloIdUsuario(id_usuario: string): Promise<Professor | undefined>;
  encontrarPeloSIAPE(siape: string): Promise<Professor | undefined>;
  validarSIAPE(siape: string): boolean;
  create(data: ICreateProfessorDTO): Promise<Professor>;
  save(professor: Professor): Promise<Professor>;
}
