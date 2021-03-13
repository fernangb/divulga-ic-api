import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListVagasIcCriadasPeloProfessorService from '@modules/vagas_ic/services/ListVagasIcCriadasPeloProfessorService';

export default class VagasIcCriadasPorProfessorController {
  public async index(request: Request, response: Response): Promise<Response> {
    const id_usuario = request.usuario.id;

    const listVagasIC = container.resolve(
      ListVagasIcCriadasPeloProfessorService,
    );

    const vagasIC = await listVagasIC.execute({ id_usuario });

    return response.json(vagasIC);
  }
}
