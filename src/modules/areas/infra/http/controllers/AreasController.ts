import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateAreaService from '@modules/areas/services/CreateAreaService';

export default class AreasController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome } = request.body;

    const createArea = container.resolve(CreateAreaService);

    const area = await createArea.execute({
      nome,
    });

    return response.json(area);
  }
}
