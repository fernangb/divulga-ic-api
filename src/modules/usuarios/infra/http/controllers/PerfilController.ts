import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePerfilService from '@modules/usuarios/services/UpdateUsuarioService';
import ShowPerfilService from '@modules/usuarios/services/ShowPerfilService';
import { classToClass } from 'class-transformer';

export default class PerfilController {
  public async show(request: Request, response: Response): Promise<Response> {
    const usuarioId = request.usuario.id;

    const showPerfil = container.resolve(ShowPerfilService);

    const usuario = await showPerfil.execute({
      usuarioId,
    });

    return response.json(classToClass(usuario));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const usuarioId = request.usuario.id;
    const { nome, email, sobrenome } = request.body;

    const updatePerfil = container.resolve(UpdatePerfilService);

    const usuario = await updatePerfil.execute({
      usuarioId,
      nome,
      email,
      sobrenome,
    });

    return response.json(classToClass(usuario));
  }
}
