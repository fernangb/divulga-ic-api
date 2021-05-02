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

    const areasSelecionadas = areas.length > 0 ? JSON.parse(areas) : [];
    const cursosSelecionados = cursos.length > 0 ? JSON.parse(cursos) : [];
    const laboratoriosSelecionados =
      laboratorios.length > 0 ? JSON.parse(laboratorios) : [];

    const listVagasIC = container.resolve(SearchVagasIcService);

    const vagaAberta = esAberta === 'true';
    const vagaPreenchida = esPreenchida === 'true';

    const vagasIC = await listVagasIC.execute({
      laboratorios: laboratoriosSelecionados,
      cursos: cursosSelecionados,
      areas: areasSelecionadas,
      professor: professor || '',
      esAberta: vagaAberta,
      esPreenchida: vagaPreenchida,
      usuarioId,
    });

    return response.json(classToClass(vagasIC));
  }
}
