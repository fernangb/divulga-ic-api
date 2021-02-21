import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePerfilService from '@modules/usuarios/services/UpdatePerfilService';
import ShowPerfilService from '@modules/usuarios/services/ShowPerfilService';

export default class PerfilController {
  public async show(request: Request, response: Response): Promise<Response> {
    const id_usuario = request.usuario.id;

    const showPerfil = container.resolve(ShowPerfilService);

    const usuario = await showPerfil.execute({
      id_usuario,
    });

    const usuarioSemSenha = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      dt_criacao: usuario.dt_criacao,
      dt_atualizacao: usuario.dt_atualizacao,
    };

    return response.json(usuarioSemSenha);
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

    // Com a atualização do TypeScript, isso se faz necessário
    const usuarioSemSenha = {
      id: usuario?.id,
      name: usuario?.nome,
      email: usuario?.email,
      created_at: usuario?.dt_criacao,
      updated_at: usuario?.dt_atualizacao,
    };

    return response.json(usuarioSemSenha);
  }
}
