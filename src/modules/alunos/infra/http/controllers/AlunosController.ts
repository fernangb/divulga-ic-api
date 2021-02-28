import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateAlunoService from '@modules/alunos/services/CreateAlunoService';
import CreateUsuarioService from '@modules/usuarios/services/CreateUsuarioService';

export default class AlunosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      dre,
      periodo,
      id_curso,
      email,
      senha,
      id_nivel,
      nome,
      sobrenome,
    } = request.body;

    const createAluno = container.resolve(CreateAlunoService);
    const createUsuario = container.resolve(CreateUsuarioService);

    const usuario = await createUsuario.execute({
      email,
      senha,
      id_nivel,
      nome,
      sobrenome,
    });

    const aluno = await createAluno.execute({
      dre,
      periodo,
      id_curso,
      id_usuario: usuario?.id,
    });

    return response.json(aluno);
  }
}
