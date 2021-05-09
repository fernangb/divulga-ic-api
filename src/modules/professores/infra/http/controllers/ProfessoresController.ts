import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateProfessorService from '@modules/professores/services/CreateProfessorService';
import CreateUsuarioService from '@modules/usuarios/services/CreateUsuarioService';
import { classToClass } from 'class-transformer';
import UpdateProfessorService from '@modules/professores/services/UpdateProfessorService';
import UpdateUsuarioService from '@modules/usuarios/services/UpdateUsuarioService';

export default class ProfessoresController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      curso,
      laboratorio,
      email,
      senha,
      confirmacaoSenha,
      nome,
      sobrenome,
      siape,
    } = request.body;

    const createProfessor = container.resolve(CreateProfessorService);
    const createUsuario = container.resolve(CreateUsuarioService);

    const usuario = await createUsuario.execute({
      email,
      senha,
      confirmacaoSenha,
      nivel: 'professor',
      nome,
      sobrenome,
    });

    const professor = await createProfessor.execute({
      curso,
      laboratorio,
      usuarioId: usuario?.id,
      siape,
    });

    return response.json(classToClass(professor));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { nome, sobrenome, email, curso, laboratorio, siape } = request.body;

    const usuarioId = request.usuario.id;

    const updateProfessor = container.resolve(UpdateProfessorService);
    const updateUsuario = container.resolve(UpdateUsuarioService);

    const usuario = await updateUsuario.execute({
      email,
      nome,
      sobrenome,
      usuarioId,
    });

    if (usuario) {
      const professor = await updateProfessor.execute({
        laboratorio,
        siape,
        curso,
        usuarioId,
      });

      return response.json(classToClass(professor));
    }
    return response.json();
  }
}
