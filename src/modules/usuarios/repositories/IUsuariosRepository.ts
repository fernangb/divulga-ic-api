import ICreateUsuarioDTO from '../dtos/ICreateUsuarioDTO';
import Usuario from '../infra/typeorm/entities/Usuario';

export default interface IUsuariosRepository {
  encontrarPeloId(id: string): Promise<Usuario | undefined>;
  encontrarPeloEmail(email: string): Promise<Usuario | undefined>;
  create(data: ICreateUsuarioDTO): Promise<Usuario>;
  save(usuario: Usuario): Promise<Usuario>;
  delete(id: string): Promise<void>;
}
