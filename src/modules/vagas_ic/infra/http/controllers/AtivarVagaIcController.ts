import { container } from 'tsyringe';
import { Request, Response } from 'express';
import AtivarVagaIcService from '@modules/vagas_ic/services/AtivarVagaIcService';

export default class AtivarVagaIcController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const ativarVagaIc = container.resolve(AtivarVagaIcService);

    await ativarVagaIc.execute(id);

    return response
      .status(200)
      .json({ message: 'Vaga IC ativada com sucesso.'});
  }
}
