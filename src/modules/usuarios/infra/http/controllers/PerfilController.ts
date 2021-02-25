import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePerfilService from '@modules/usuarios/services/UpdatePerfilService';
import ShowPerfilService from '@modules/usuarios/services/ShowPerfilService';
import { classToClass } from 'class-transformer';

export default class PerfilController {
  public async show(request: Request, response: Response): Promise<Response> {
    const id_usuario = request.usuario.id;

    const showPerfil = container.resolve(ShowPerfilService);

    const usuario = await showPerfil.execute({
      id_usuario,
    });

    return response.json(classToClass(usuario));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id_usuario = request.usuario.id;
    const { nome, email, senha_antiga, senha } = request.body;

    const updatePerfil = container.resolve(UpdatePerfilService);

    const usuario = await updatePerfil.execute({
      id_usuario,
      nome,
      email,
      senha_antiga,
      senha,
    });

    return response.json(classToClass(usuario));
  }
}
