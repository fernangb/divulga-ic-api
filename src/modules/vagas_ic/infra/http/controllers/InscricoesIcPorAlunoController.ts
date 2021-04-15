import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListInscricoesRealizadasPeloAlunoService from '@modules/vagas_ic/services/ListInscricoesRealizadasPeloAlunoService';
import EliminarInscricaoAlunoIcService from '@modules/vagas_ic/services/EliminarInscricaoAlunoService';

export default class InscricoesIcPorAlunoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const usuarioId = request.usuario.id;

    const listInscricoesIC = container.resolve(
      ListInscricoesRealizadasPeloAlunoService,
    );

    const vagasIC = await listInscricoesIC.execute({ usuarioId });

    return response.json(vagasIC);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const eliminarInscricaoAluno = container.resolve(
      EliminarInscricaoAlunoIcService,
    );

    await eliminarInscricaoAluno.execute(id);

    return response.json({ message: 'Aluno eliminado da vaga de IC.' });
  }
}
