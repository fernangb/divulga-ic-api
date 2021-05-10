import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import ListAlunosInscritosPorProfessorService from '@modules/vagas_ic/services/ListAlunosInscritosPorProfessorService';

export default class AlunosInscritosPorVagaIcController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listAlunosInscritos = container.resolve(
      ListAlunosInscritosPorProfessorService,
    );

    const inscricoesIC = await listAlunosInscritos.execute({ id });

    return response.json(classToClass(inscricoesIC));
  }
}
