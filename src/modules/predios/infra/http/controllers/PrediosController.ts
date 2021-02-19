import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreatePredioService from '@modules/predios/services/CreatePredioService';

export default class PrediosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, nome_comum, endereco, id_campus } = request.body;

    const createPredio = container.resolve(CreatePredioService);

    const predio = await createPredio.execute({
      nome,
      nome_comum,
      endereco,
      id_campus,
    });

    return response.json(predio);
  }
}
