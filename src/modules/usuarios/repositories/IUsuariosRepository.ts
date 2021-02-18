import ICreateUsuarioDTO from '../dtos/ICreateUsuarioDTO';
import Usuario from '../infra/typeorm/entities/Usuario';

export default interface IUsuariosRepository {
  procurarPeloId(id: string): Promise<Usuario | undefined>;
  procurarPeloEmail(email: string): Promise<Usuario | undefined>;
  create(data: ICreateUsuarioDTO): Promise<Usuario>;
  save(usuario: Usuario): Promise<Usuario>;
}
