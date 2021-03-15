import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListNivelPorNomeService from '@modules/usuarios/services/ListNivelPorNomeService';
import { classToClass } from 'class-transformer';

export default class NiveisPorCursoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { nome } = request.params;

    const listNiveis = container.resolve(ListNivelPorNomeService);

    const nivel = await listNiveis.execute({ nome });

    return response.json(classToClass(nivel));
  }
}
