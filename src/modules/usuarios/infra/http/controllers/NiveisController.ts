import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateNivelService from '@modules/usuarios/services/CreateNivelService';
import { classToClass } from 'class-transformer';

export default class NiveisController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome } = request.body;

    const createNivel = container.resolve(CreateNivelService);

    const nivel = await createNivel.execute({
      nome,
    });

    return response.json(classToClass(nivel));
  }
}
