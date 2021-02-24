import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateVagaIcService from '@modules/vagas_ic/services/CreateVagaIcService';
import ListVagasIcService from '@modules/vagas_ic/services/ListVagasIcService';

export default class VagasIcController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao,
      vl_bolsa,
      hr_semana,
      cr_minimo,
      periodo_minimo,
      nr_vagas,
      id_laboratorio,
      id_curso,
      id_professor,
      id_area,
    } = request.body;

    const createVagaIC = container.resolve(CreateVagaIcService);

    const vagaIC = await createVagaIC.execute({
      nome,
      descricao,
      vl_bolsa,
      hr_semana,
      cr_minimo,
      periodo_minimo,
      nr_vagas,
      id_laboratorio,
      id_curso,
      id_professor,
      id_area,
    });

    return response.json(vagaIC);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listVagasIC = container.resolve(ListVagasIcService);

    const vagasIC = await listVagasIC.execute();

    return response.json(vagasIC);
  }
}
