import { container } from 'tsyringe';
import { Request, Response } from 'express';
import AuthenticateUsuarioService from '@modules/usuarios/services/AuthenticateUsuarioService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const usuarioAutenticado = container.resolve(AuthenticateUsuarioService);

    const { user, token } = await usuarioAutenticado.execute({
      email,
      senha: password,
    });

    delete user.senha;

    return response.json({ user, token });
  }
}
