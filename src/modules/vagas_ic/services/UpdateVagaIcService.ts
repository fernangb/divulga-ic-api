import VagaIc from '@modules/vagas_ic/infra/typeorm/entities/VagaIC';
import IVagasIcRepository from '@modules/vagas_ic/repositories/IVagasIcRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ILaboratoriosRepository from '@modules/laboratorios/repositories/ILaboratoriosRepository';
import IAreasRepository from '@modules/areas/repositories/IAreasRepository';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import IUpdateVagaIcDTO from '../dtos/IUpdateVagaIcDTO';

@injectable()
class UpdateVagaIcService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('LaboratoriosRepository')
    private laboratoriosRepository: ILaboratoriosRepository,
    @inject('AreasRepository')
    private areasRepository: IAreasRepository,
    @inject('CursosRepository')
    private cursosRepository: ICursosRepository,
  ) {}

  public async execute({
    id,
    nome,
    descricao,
    vlBolsa,
    hrSemana,
    crMinimo,
    periodoMinimo,
    nrVagas,
    laboratorio,
    areas,
    cursos,
  }: IUpdateVagaIcDTO): Promise<VagaIc> {
    if (!id) {
      throw new AppError('ID não preenchido.');
    }

    const vagaExistente = await this.vagasIcRepository.encontrarPeloId(id);

    if (!vagaExistente) {
      throw new AppError('Vaga não encontrada.');
    }

    if (nome) vagaExistente.nome = nome;

    if (descricao) vagaExistente.descricao = descricao;

    if (vlBolsa) {
      if (!this.vagasIcRepository.validarValorBolsa(vlBolsa))
        throw new AppError('Valor da bolsa não pode ser negativo.');

      vagaExistente.vlBolsa = vlBolsa;
    }

    if (hrSemana) {
      if (!this.vagasIcRepository.validarHorasSemanais(hrSemana))
        throw new AppError('Horas semanais inválida. ');

      vagaExistente.hrSemana = hrSemana;
    }

    if (crMinimo) {
      if (!this.vagasIcRepository.validarCrMinimo(crMinimo))
        throw new AppError('CR mínimo inválido.');

      vagaExistente.crMinimo = crMinimo;
    }

    if (periodoMinimo) {
      if (!this.vagasIcRepository.validarCrMinimo(periodoMinimo))
        throw new AppError('Período mínimo inválido.');

      vagaExistente.periodoMinimo = periodoMinimo;
    }

    if (nrVagas) {
      if (!this.vagasIcRepository.validarCrMinimo(nrVagas))
        throw new AppError('Número de vagas não pode ser negativo.');

      vagaExistente.nrVagas = nrVagas;
    }

    if (laboratorio) {
      const laboratorioExistente = await this.laboratoriosRepository.encontrarPelaSigla(
        laboratorio,
      );

      if (!laboratorioExistente)
        throw new AppError('Laboratório não encontrado.');

      vagaExistente.laboratorio = laboratorioExistente;
    }

    if (areas.length === 0) {
      throw new AppError('Número mínimo de áreas inválido.');
    }

    const areasExistentes = await this.areasRepository.encontrarPelosNomes(
      areas,
    );

    if (areasExistentes.length !== areas.length)
      throw new AppError('Áreas inválidas.');

    vagaExistente.areas = areasExistentes;

    if (cursos.length === 0) {
      throw new AppError('Número mínimo de áreas inválido.');
    }

    const cursosExistentes = await this.cursosRepository.encontrarPelosNomes(
      cursos,
    );

    if (cursosExistentes.length !== cursos.length)
      throw new AppError('Cursos inválidos.');

    vagaExistente.cursos = cursosExistentes;

    return this.vagasIcRepository.save(vagaExistente);
  }
}

export default UpdateVagaIcService;
