import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Usuario from '../models/Usuario';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  id_usuario: string;
  avatarFilename: string;
}

class UpdateAvatarUsuarioService {
  public async execute({
    id_usuario,
    avatarFilename,
  }: Request): Promise<Usuario> {
    const usuariosRepository = getRepository(Usuario);

    const usuario = await usuariosRepository.findOne(id_usuario);
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

    await usuariosRepository.save(usuario);

    return usuario;
  }
}

export default UpdateAvatarUsuarioService;
