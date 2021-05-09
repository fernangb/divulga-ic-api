import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateAlunoService from '@modules/alunos/services/CreateAlunoService';
import CreateUsuarioService from '@modules/usuarios/services/CreateUsuarioService';
import { classToClass } from 'class-transformer';
import UpdateAlunoService from '@modules/alunos/services/UpdateAlunoService';
import UpdateUsuarioService from '@modules/usuarios/services/UpdateUsuarioService';

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
      confirmacaoSenha,
    } = request.body;

    const createAluno = container.resolve(CreateAlunoService);
    const createUsuario = container.resolve(CreateUsuarioService);

    const usuario = await createUsuario.execute({
      email,
      senha,
      nivel: 'aluno',
      nome,
      sobrenome,
      confirmacaoSenha,
    });

    const aluno = await createAluno.execute({
      dre,
      periodo,
      curso,
      usuarioId: usuario?.id,
    });

    return response.json(classToClass(aluno));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { dre, cr, periodo, curso, email, nome, sobrenome } = request.body;

    const usuarioId = request.usuario.id;

    const updateAluno = container.resolve(UpdateAlunoService);
    const updateUsuario = container.resolve(UpdateUsuarioService);

    const usuario = await updateUsuario.execute({
      email,
      nome,
      sobrenome,
      usuarioId,
    });

    if (usuario) {
      const aluno = await updateAluno.execute({
        dre,
        periodo,
        cr,
        curso,
        usuarioId,
      });

      return response.json(classToClass(aluno));
    }
    return response.json();
  }
}
