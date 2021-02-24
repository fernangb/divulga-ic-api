import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListVagasIcPorAlunoService from '@modules/vagas_ic/services/ListVagasIcPorAlunoService';

export default class VagasIcController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id_aluno } = request.body;
    const listVagasIC = container.resolve(ListVagasIcPorAlunoService);

    const vagasIC = await listVagasIC.execute({ id_aluno });

    return response.json(vagasIC);
  }
}
