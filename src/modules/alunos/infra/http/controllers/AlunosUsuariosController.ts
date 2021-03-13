import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ShowAlunoPorIdUsuarioService from '@modules/alunos/services/ShowAlunoPorIdUsuarioService';

export default class AlunosUsuariosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id_usuario } = request.params;

    const showAluno = container.resolve(ShowAlunoPorIdUsuarioService);

    const aluno = await showAluno.execute(id_usuario);

    return response.json(aluno);
  }
}
