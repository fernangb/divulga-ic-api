import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateCampusService from '@modules/campus/services/CreateCampusService';

export default class CampussController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, nome_comum, endereco } = request.body;

    const createCampus = container.resolve(CreateCampusService);

    const campus = await createCampus.execute({
      nome,
      endereco,
      nome_comum,
    });

    return response.json(campus);
  }
}
