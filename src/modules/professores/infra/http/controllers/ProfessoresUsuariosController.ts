import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ShowProfessorPorIdUsuarioService from '@modules/professores/services/ShowProfessorPorIdUsuarioService';
import { classToClass } from 'class-transformer';

export default class ProfessoresUsuariosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { usuarioId } = request.params;

    const showProfessor = container.resolve(ShowProfessorPorIdUsuarioService);

    const professor = await showProfessor.execute(usuarioId);

    return response.json(classToClass(professor));
  }
}
