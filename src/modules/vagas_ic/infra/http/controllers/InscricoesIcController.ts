import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateInscricaoIcService from '@modules/vagas_ic/services/CreateInscricaoIcService';
import ListInscricoesIcService from '@modules/vagas_ic/services/ListInscricoesIcService';

export default class InscricoesIcController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id_vaga, id_aluno } = request.body;

    const createInscricaoIC = container.resolve(CreateInscricaoIcService);

    const vagaIC = await createInscricaoIC.execute({
      id_vaga,
      id_aluno,
    });

    return response.json(vagaIC);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listInscricoesIC = container.resolve(ListInscricoesIcService);

    const inscricoesIC = await listInscricoesIC.execute();

    return response.json(inscricoesIC);
  }
}
