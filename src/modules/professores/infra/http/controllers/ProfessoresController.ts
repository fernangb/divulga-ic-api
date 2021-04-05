import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateProfessorService from '@modules/professores/services/CreateProfessorService';
import CreateUsuarioService from '@modules/usuarios/services/CreateUsuarioService';
import { classToClass } from 'class-transformer';

export default class ProfessoresController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      curso,
      laboratorio,
      email,
      senha,
      confirmacao_senha,
      nome,
      sobrenome,
      siape,
    } = request.body;

    const createProfessor = container.resolve(CreateProfessorService);
    const createUsuario = container.resolve(CreateUsuarioService);

    const usuario = await createUsuario.execute({
      email,
      senha,
      confirmacao_senha,
      nivel: 'professor',
      nome,
      sobrenome,
    });

    const professor = await createProfessor.execute({
      curso,
      laboratorio,
      id_usuario: usuario?.id,
      siape,
    });

    return response.json(classToClass(professor));
  }
}
