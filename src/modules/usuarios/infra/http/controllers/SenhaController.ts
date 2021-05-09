import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateSenhaService from '@modules/usuarios/services/UpdateSenhaService';

export default class SenhaController {
  public async update(request: Request, response: Response): Promise<Response> {
    const usuarioId = request.usuario.id;
    const { senha, novaSenha } = request.body;

    const updateSenha = container.resolve(UpdateSenhaService);

    await updateSenha.execute({
      usuarioId,
      senha: novaSenha,
      senha_antiga: senha,
    });

    return response
      .status(200)
      .json({ message: 'Senha atualizada com sucesso.' });
  }
}
