import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreatePredioService from '@modules/predios/services/CreatePredioService';
import ListPrediosService from '@modules/predios/services/ListPrediosService';
import { classToClass } from 'class-transformer';

export default class PrediosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, nome_comum, endereco } = request.body;

    const createPredio = container.resolve(CreatePredioService);

    const predio = await createPredio.execute({
      nome,
      nome_comum,
      endereco,
    });

    return response.json(classToClass(predio));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listPredios = container.resolve(ListPrediosService);

    const predios = await listPredios.execute();

    return response.json(classToClass(predios));
  }
}
