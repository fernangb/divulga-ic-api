import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import SearchVagasIcService from '@modules/vagas_ic/services/SearchVagasIcService';

export default class VagasIcFiltradasController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      laboratorios,
      cursos,
      areas,
      professor,
      esAberta,
      esPreenchida,
    } = request.query;
    const usuarioId = request.usuario.id;

    const vagaAberta = esAberta === 'true';
    const vagaPreenchida = esPreenchida === 'true';

    const listVagasIC = container.resolve(SearchVagasIcService);

    const vagasIC = await listVagasIC.execute({
      laboratorios: (laboratorios as string).split(','),
      cursos: (cursos as string).split(','),
      areas: (areas as string).split(','),
      professor: professor as string,
      esAberta: vagaAberta,
      esPreenchida: vagaPreenchida,
      usuarioId,
    });

    return response.json(classToClass(vagasIC));
  }
}
