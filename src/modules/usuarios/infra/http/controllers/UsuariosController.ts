import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUsuarioService from '@modules/usuarios/services/CreateUsuarioService';
import DeleteUsuarioService from '@modules/usuarios/services/DeleteUsuarioService';

export default class UsuariosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, senha, id_nivel, nome } = request.body;

    const createUsuario = container.resolve(CreateUsuarioService);

    const user = await createUsuario.execute({
      email,
      senha,
      id_nivel,
      nome,
    });

    delete user.senha;

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUsuario = container.resolve(DeleteUsuarioService);

    await deleteUsuario.execute(id);

    return response
      .status(200)
      .json({ message: 'Usuário removido com sucesso' });
  }
}
