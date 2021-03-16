import { container } from 'tsyringe';
import { Request, Response } from 'express';
import AuthenticateUsuarioService from '@modules/usuarios/services/AuthenticateUsuarioService';
import { classToClass } from 'class-transformer';
import ShowAlunoPorIdUsuarioService from '@modules/alunos/services/ShowAlunoPorIdUsuarioService';
import ShowProfessorPorIdUsuarioService from '@modules/professores/services/ShowProfessorPorIdUsuarioService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const usuarioAutenticado = container.resolve(AuthenticateUsuarioService);

    const { user, token } = await usuarioAutenticado.execute({
      email,
      senha: password,
    });

    if (user.nivel.nome === 'aluno') {
      const showAluno = container.resolve(ShowAlunoPorIdUsuarioService);

      const aluno = await showAluno.execute(user.id);

      return response.json({
        user: classToClass(user),
        aluno: classToClass(aluno),
        professor: '',
        token,
      });
    }

    if (user.nivel.nome === 'professor') {
      const showProfessor = container.resolve(ShowProfessorPorIdUsuarioService);

      const professor = await showProfessor.execute(user.id);

      return response.json({
        user: classToClass(user),
        aluno: '',
        professor: classToClass(professor),
        token,
      });
    }

    return response.json({
      user: classToClass(user),
      token,
      aluno: '',
      professor: '',
    });
  }
}
