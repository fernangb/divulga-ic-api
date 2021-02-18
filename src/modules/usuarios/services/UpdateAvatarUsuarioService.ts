import path from 'path';
import fs from 'fs';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
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
      const avatarUsuarioFilePath = path.join(
        uploadConfig.directory,
        usuario.avatar,
      );

      const existeAvatarUsuario = await fs.promises.stat(avatarUsuarioFilePath);

      if (existeAvatarUsuario) {
        await fs.promises.unlink(avatarUsuarioFilePath);
      }
    }

    usuario.avatar = avatarFilename;

    await this.usuariosRepository.save(usuario);

    return usuario;
  }
}

export default UpdateAvatarUsuarioService;
