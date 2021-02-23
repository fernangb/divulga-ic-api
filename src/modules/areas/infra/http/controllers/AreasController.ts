import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateAreaService from '@modules/areas/services/CreateAreaService';
import ListAreasService from '@modules/areas/services/ListAreasService';

export default class AreasController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome } = request.body;

    const createArea = container.resolve(CreateAreaService);

    const area = await createArea.execute({
      nome,
    });

    return response.json(area);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listAreas = container.resolve(ListAreasService);

    const areas = await listAreas.execute();

    return response.json(areas);
  }
}
