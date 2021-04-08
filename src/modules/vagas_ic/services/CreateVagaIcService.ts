import IAreasRepository from '@modules/areas/repositories/IAreasRepository';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import ILaboratoriosRepository from '@modules/laboratorios/repositories/ILaboratoriosRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import VagaIC from '../infra/typeorm/entities/VagaIC';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

interface IRequest {
  nome: string;
  descricao?: string;
  vlBolsa?: number;
  hrSemana?: number;
  crMinimo?: number;
  nrVagas?: number;
  periodoMinimo?: number;
  laboratorioId: string;
  cursos: string[];
  professorId: string;
  areas: string[];
}
@injectable()
class CreateVagaIcService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('LaboratoriosRepository')
    private laboratoriosRepository: ILaboratoriosRepository,
    @inject('CursosRepository')
    private cursosRepository: ICursosRepository,
    @inject('AreasRepository')
    private areasRepository: IAreasRepository,
  ) {}

  public async execute({
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
  }: IRequest): Promise<VagaIC> {
    const laboratorio = await this.laboratoriosRepository.encontrarPeloId(
      laboratorioId,
    );

    if (!laboratorio) {
      throw new AppError('Laboratório não existe.');
    }

    const vagaEncontrada = await this.vagasIcRepository.encontrarVagaExistente({
      nome,
      laboratorioId,
    });

    if (vagaEncontrada) {
      throw new AppError('Vaga já cadastrada no sistema.');
    }

    if (vlBolsa && vlBolsa < 0) {
      throw new AppError('Valor da bolsa não pode ser negativo.');
    }

    if (hrSemana && (hrSemana < 0 || hrSemana > 20)) {
      throw new AppError('Horas semanais inválida. ');
    }

    if (crMinimo && (crMinimo < 0 || crMinimo > 10)) {
      throw new AppError('CR mínimo inválido.');
    }

    if (periodoMinimo && (periodoMinimo < 1 || periodoMinimo > 10)) {
      throw new AppError('Período mínimo inválido.');
    }

    if (nrVagas && nrVagas < 0) {
      throw new AppError('Número de vagas não pode ser negativo.');
    }

    const areasExistentes = await this.areasRepository.encontrarPelosNomes(areas);

    const cursosExistentes = await this.cursosRepository.encontrarPelosNomes(cursos);

    const vagaIC = await this.vagasIcRepository.create({
      nome,
      descricao,
      vlBolsa,
      hrSemana,
      crMinimo,
      periodoMinimo,
      nrVagas,
      laboratorioId,
      professorId,
      areas: areasExistentes,
      cursos: cursosExistentes,
    });

    return vagaIC;
  }
}

export default CreateVagaIcService;
