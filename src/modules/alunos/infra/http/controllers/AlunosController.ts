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
      confirmacaoSenha
    } = request.body;

    const createAluno = container.resolve(CreateAlunoService);
    const createUsuario = container.resolve(CreateUsuarioService);

    const usuario = await createUsuario.execute({
      email,
      senha,
      nivel: 'aluno',
      nome,
      sobrenome,
      confirmacaoSenha
    });

    const aluno = await createAluno.execute({
      dre,
      periodo,
      curso,
      usuarioId: usuario?.id,
    });

    return response.json(classToClass(aluno));
  }
}
