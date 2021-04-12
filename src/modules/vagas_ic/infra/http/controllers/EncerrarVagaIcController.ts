import { container } from 'tsyringe';
import { Request, Response } from 'express';
import EncerrarVagaIcService from '@modules/vagas_ic/services/EncerrarVagaIcService';

export default class EncerrarVagaIcController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const encerrarVagaIc = container.resolve(EncerrarVagaIcService);

    await encerrarVagaIc.execute(id);

    return response
      .status(200)
      .json({ message: 'Vaga IC encerrada com sucesso.'});
  }
}
