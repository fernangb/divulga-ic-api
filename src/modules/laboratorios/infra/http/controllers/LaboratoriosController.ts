import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateLaboratorioService from '@modules/laboratorios/services/CreateLaboratorioService';
import ListLaboratoriosService from '@modules/laboratorios/services/ListLaboratoriosService';
import { classToClass } from 'class-transformer';

export default class LaboratoriosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, sigla, sala, id_predio } = request.body;

    const createLaboratorio = container.resolve(CreateLaboratorioService);

    const laboratorio = await createLaboratorio.execute({
      nome,
      sigla,
      sala,
      id_predio,
    });

    return response.json(classToClass(laboratorio));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listLaboratorios = container.resolve(ListLaboratoriosService);

    const laboratorios = await listLaboratorios.execute();

    return response.json(classToClass(laboratorios));
  }
}
