import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListAlunosInscritosVagaIcService from '@modules/vagas_ic/services/ListAlunosInscritosVagaIcService';

export default class AlunosInscritosPorVagaIcController {
  public async index(request: Request, response: Response): Promise<Response> {
    const id_vaga = request.params;

    const listAlunosInscritos = container.resolve(
      ListAlunosInscritosVagaIcService,
    );

    const inscricoesIC = await listAlunosInscritos.execute({ id_vaga });

    return response.json(inscricoesIC);
  }
}