import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateInscricaoIcService from '@modules/vagas_ic/services/CreateInscricaoIcService';
import ListInscricoesIcService from '@modules/vagas_ic/services/ListInscricoesIcService';
import DeleteInscricaoIcService from '@modules/vagas_ic/services/DeleteInscricaoIcService';

export default class InscricoesIcController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id_vaga, id_aluno } = request.body;

    const createInscricaoIC = container.resolve(CreateInscricaoIcService);

    const inscricaoIC = await createInscricaoIC.execute({
      id_vaga,
      id_aluno,
    });

    return response.json(inscricaoIC);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listInscricoesIC = container.resolve(ListInscricoesIcService);

    const inscricoesIC = await listInscricoesIC.execute();

    return response.json(inscricoesIC);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteInscricao = container.resolve(DeleteInscricaoIcService);

    await deleteInscricao.execute(id);

    return response
      .status(200)
      .json({ message: 'Inscrição cancelada com sucesso' });
  }
}
