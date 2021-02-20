import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

interface IRequest {
  id_usuario: string;
  avatarFilename: string;
}

@injectable()
class UpdateAvatarUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id_usuario,
    avatarFilename,
  }: IRequest): Promise<Usuario> {
    const usuario = await this.usuariosRepository.procurarPeloId(id_usuario);
    if (!usuario) {
      throw new AppError(
        'Apenas usuarios autenticados pode alterar a foto.',
        401,
      );
    }

    if (usuario.avatar) {
      await this.storageProvider.deletarArquivo(usuario.avatar);
    }
    const filename = await this.storageProvider.salvarArquivo(avatarFilename);

    usuario.avatar = filename;

    await this.usuariosRepository.save(usuario);

    return usuario;
  }
}

export default UpdateAvatarUsuarioService;
