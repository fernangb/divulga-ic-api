import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUsuarioService from '@modules/usuarios/services/CreateUsuarioService';

export default class UsuariosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, senha, id_nivel } = request.body;

    const createUsuario = container.resolve(CreateUsuarioService);

    const user = await createUsuario.execute({
      email,
      senha,
      id_nivel,
    });

    delete user.senha;

    return response.json(user);
  }
}
