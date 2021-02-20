import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ResetarSenhaService from '@modules/usuarios/services/ResetarSenhaService';

export default class ResetarSenhaController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, senha } = request.body;

    const resetarSenha = container.resolve(ResetarSenhaService);

    await resetarSenha.execute({
      token,
      senha,
    });

    return response.status(204).json();
  }
}
