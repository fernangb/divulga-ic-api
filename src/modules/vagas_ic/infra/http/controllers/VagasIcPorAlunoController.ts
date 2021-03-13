import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListVagasIcPorAlunoService from '@modules/vagas_ic/services/ListVagasIcRecomendadasService';

export default class VagasIcPorAlunoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const id_usuario = request.usuario.id;

    const listVagasIC = container.resolve(ListVagasIcPorAlunoService);

    const vagasIC = await listVagasIC.execute({ id_usuario });

    return response.json(vagasIC);
  }
}
