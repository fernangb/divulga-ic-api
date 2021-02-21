import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateAlunoService from '@modules/alunos/services/CreateAlunoService';

export default class AlunosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      dre,
      periodo,
      id_curso,
      email,
      senha,
      nome,
      id_nivel,
    } = request.body;

    const createAluno = container.resolve(CreateAlunoService);

    const aluno = await createAluno.execute({
      email,
      senha,
      id_nivel,
      nome,
      dre,
      periodo,
      id_curso,
    });

    delete aluno.senha;

    return response.json(aluno);
  }
}
