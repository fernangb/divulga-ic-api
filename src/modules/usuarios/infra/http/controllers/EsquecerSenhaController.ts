import { container } from 'tsyringe';
import { Request, Response } from 'express';
import EnviarEmailRecuperarSenhaService from '@modules/usuarios/services/EnviarEmailRecuperarSenhaService';

export default class EsquecerSenhaController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const enviarEmailRecuperarSenha = container.resolve(
      EnviarEmailRecuperarSenhaService,
    );

    await enviarEmailRecuperarSenha.execute({
      email,
    });

    return response.status(204).json();
  }
}
