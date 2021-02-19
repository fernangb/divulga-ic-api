import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateAvatarUsuarioService from '@modules/usuarios/services/UpdateAvatarUsuarioService';

export default class AvatarUsuariosController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateAvatarUsuario = container.resolve(UpdateAvatarUsuarioService);

      const user = await updateAvatarUsuario.execute({
        id_usuario: request.usuario.id,
        avatarFilename: request.file.filename,
      });

      delete user.senha;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
