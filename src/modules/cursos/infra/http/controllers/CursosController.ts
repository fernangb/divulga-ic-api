import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateCursoService from '@modules/cursos/services/CreateCursoService';
import ListCursosService from '@modules/cursos/services/ListCursosService';
import { classToClass } from 'class-transformer';

export default class CursosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      predioId,
      endereco,
      tipo,
      turno,
      nrPeriodos,
    } = request.body;

    const createCurso = container.resolve(CreateCursoService);

    const curso = await createCurso.execute({
      nome,
      predioId,
      endereco,
      tipo,
      turno,
      nrPeriodos,
    });

    return response.json(classToClass(curso));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCursos = container.resolve(ListCursosService);

    const cursos = await listCursos.execute();

    return response.json(classToClass(cursos));
  }
}
