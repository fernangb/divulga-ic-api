import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ICreateUsuarioDTO from '@modules/usuarios/dtos/ICreateUsuarioDTO';
import { v4 as uuid_v4 } from 'uuid';

class FakeUsuariosRepository implements IUsuariosRepository {
  private usuarios: Usuario[] = [];

  public async procurarPeloId(id: string): Promise<Usuario | undefined> {
    const usuarioEncontrado = this.usuarios.find(usuario => usuario.id === id);

    return usuarioEncontrado;
  }

  public async procurarPeloEmail(email: string): Promise<Usuario | undefined> {
    const usuarioEncontrado = this.usuarios.find(
      usuario => usuario.email === email,
    );

    return usuarioEncontrado;
  }

  public async create({
    email,
    senha,
    id_nivel,
  }: ICreateUsuarioDTO): Promise<Usuario> {
    const usuario = new Usuario();

    Object.assign(usuario, { id: uuid_v4(), email, senha, id_nivel });

    this.usuarios.push(usuario);

    return usuario;
  }

  public async save(usuario: Usuario): Promise<Usuario> {
    const indiceUsuario = this.usuarios.findIndex(u => u.id === usuario.id);

    this.usuarios[indiceUsuario] = usuario;

    return usuario;
  }
}

export default FakeUsuariosRepository;
