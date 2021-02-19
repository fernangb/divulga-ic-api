import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateNivelService from '@modules/usuarios/services/CreateNivelService';

export default class AreasController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome } = request.body;

    const createNivel = container.resolve(CreateNivelService);

    const nivel = await createNivel.execute({
      nome,
    });

    return response.json(nivel);
  }
}
