import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListVagasIcPorAlunoService from '@modules/vagas_ic/services/ListVagasIcRecomendadasService';
import ListInscricoesRealizadasPeloAlunoService from '@modules/vagas_ic/services/ListInscricoesRealizadasPeloAlunoService';

export default class InscricoesIcPorAlunoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const id_usuario = request.usuario.id;

    const listInscricoesIC = container.resolve(
      ListInscricoesRealizadasPeloAlunoService,
    );

    const vagasIC = await listInscricoesIC.execute({ id_usuario });

    return response.json(vagasIC);
  }
}
