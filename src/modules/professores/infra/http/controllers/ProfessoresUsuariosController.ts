import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ShowProfessorPorIdUsuarioService from '@modules/professores/services/ShowProfessorPorIdUsuarioService';

export default class ProfessoresUsuariosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id_usuario } = request.params;

    const showProfessor = container.resolve(ShowProfessorPorIdUsuarioService);

    const aluno = await showProfessor.execute(id_usuario);

    return response.json(aluno);
  }
}
