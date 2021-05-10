import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListAlunosInscritosVagaIcService from '@modules/vagas_ic/services/ListAlunosInscritosVagaIcService';
import { classToClass } from 'class-transformer';

export default class AlunosInscritosPorVagaIcController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { vagaIcId } = request.params;

    const listAlunosInscritos = container.resolve(
      ListAlunosInscritosVagaIcService,
    );

    const inscricoesIC = await listAlunosInscritos.execute({ vagaIcId });

    return response.json(classToClass(inscricoesIC));
  }
}
