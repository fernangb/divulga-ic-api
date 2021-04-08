import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import ListAreasPeloNomeService from '@modules/areas/services/ListAreasPeloNomeService';

export default class AreasPeloNomeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {nomes} = request.body;

    const listAreas = container.resolve(ListAreasPeloNomeService);

    const areas = await listAreas.execute(nomes);

    return response.json(classToClass(areas));
  }
}
