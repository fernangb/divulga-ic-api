import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateProfessorService from '@modules/professores/services/CreateProfessorService';
import CreateUsuarioService from '@modules/usuarios/services/CreateUsuarioService';

export default class ProfessoresController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      id_curso,
      id_laboratorio,
      email,
      senha,
      nome,
      id_nivel,
    } = request.body;

    const createProfessor = container.resolve(CreateProfessorService);
    const createUsuario = container.resolve(CreateUsuarioService);

    const usuario = await createUsuario.execute({
      email,
      senha,
      id_nivel,
      nome,
    });
    const professor = await createProfessor.execute({
      id_curso,
      id_laboratorio,
      id_usuario: usuario?.id,
    });

    return response.json(professor);
  }
}
