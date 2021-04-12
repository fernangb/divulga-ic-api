import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateVagaIcService from '@modules/vagas_ic/services/CreateVagaIcService';
import ListVagasIcService from '@modules/vagas_ic/services/ListVagasIcService';
import { classToClass } from 'class-transformer';
import UpdateVagaIcService from '@modules/vagas_ic/services/UpdateVagaIcService';
import DeleteVagaIcService from '@modules/vagas_ic/services/DeleteVagaIcService';

export default class VagasIcController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao,
      vlBolsa,
      hrSemana,
      crMinimo,
      periodoMinimo,
      nrVagas,
      laboratorioId,
      cursos,
      professorId,
      areas,
    } = request.body;

    const createVagaIC = container.resolve(CreateVagaIcService);

    const vagaIC = await createVagaIC.execute({
      nome,
      descricao,
      vlBolsa,
      hrSemana,
      crMinimo,
      periodoMinimo,
      nrVagas,
      laboratorioId,
      cursos,
      professorId,
      areas,
    });

    return response.json(classToClass(vagaIC));

  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listVagasIC = container.resolve(ListVagasIcService);

    const vagasIC = await listVagasIC.execute();

    return response.json(classToClass(vagasIC));
  }

  public async update(request: Request, response: Response): Promise<Response>{
    const {
      id,
      nome,
      descricao,
      vlBolsa,
      nrVagas,
      crMinimo,
      hrSemana,
      periodoMinimo,
      laboratorio,
      areas,
      cursos,
    } = request.body;
    const updateVagaIc = container.resolve(UpdateVagaIcService);

    const vagaIC = await updateVagaIc.execute({
      id,
      nome,
      descricao,
      vlBolsa,
      nrVagas,
      crMinimo,
      hrSemana,
      periodoMinimo,
      laboratorio,
      areas,
      cursos,
    });

    return response.json(classToClass(vagaIC));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteVagaIc = container.resolve(DeleteVagaIcService);

    await deleteVagaIc.execute(id);

    return response
      .status(200)
      .json({ message: 'Vaga IC removida com sucesso.' });
  }
}
