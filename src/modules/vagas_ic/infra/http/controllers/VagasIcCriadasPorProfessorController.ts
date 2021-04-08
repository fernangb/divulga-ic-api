import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListVagasIcCriadasPeloProfessorService from '@modules/vagas_ic/services/ListVagasIcCriadasPeloProfessorService';
import { classToClass } from 'class-transformer';

export default class VagasIcCriadasPorProfessorController {
  public async index(request: Request, response: Response): Promise<Response> {
    const usuarioId = request.usuario.id;

    const listVagasIC = container.resolve(
      ListVagasIcCriadasPeloProfessorService,
    );

    const vagasIC = await listVagasIC.execute({ usuarioId });

    return response.json(classToClass(vagasIC));
  }
}
