import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateAlunoService from '@modules/alunos/services/CreateAlunoService';
import CreateUsuarioService from '@modules/usuarios/services/CreateUsuarioService';
import { classToClass } from 'class-transformer';

export default class AlunosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      dre,
      periodo,
      curso,
      email,
      senha,
      nome,
      sobrenome,
      confirmacao_senha
    } = request.body;

    const createAluno = container.resolve(CreateAlunoService);
    const createUsuario = container.resolve(CreateUsuarioService);

    const usuario = await createUsuario.execute({
      email,
      senha,
      nivel: 'aluno',
      nome,
      sobrenome,
      confirmacao_senha
    });

    const aluno = await createAluno.execute({
      dre,
      periodo,
      curso,
      id_usuario: usuario?.id,
    });

    return response.json(classToClass(aluno));
  }
}
