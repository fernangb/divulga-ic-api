import { getRepository, Repository } from 'typeorm';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import ICreateUsuarioDTO from '@modules/usuarios/dtos/ICreateUsuarioDTO';

class UsuariosRepository implements IUsuariosRepository {
  private ormRepository: Repository<Usuario>;

  constructor() {
    this.ormRepository = getRepository(Usuario);
  }

  public async encontrarPeloId(id: string): Promise<Usuario | undefined> {
    const usuarioEncontrado = await this.ormRepository.findOne(id);

    return usuarioEncontrado;
  }

  public async encontrarPeloEmail(email: string): Promise<Usuario | undefined> {
    const usuarioEncontrado = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return usuarioEncontrado;
  }

  public async create({
    email,
    senha,
    nivelId,
    nome,
    sobrenome,
  }: ICreateUsuarioDTO): Promise<Usuario> {
    const usuario = this.ormRepository.create({
      email,
      senha,
      nivelId,
      nome,
      sobrenome,
    });

    await this.ormRepository.save(usuario);

    return usuario;
  }

  public async save(usuario: Usuario): Promise<Usuario> {
    return this.ormRepository.save(usuario);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UsuariosRepository;
