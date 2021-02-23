import IAreasRepository from '@modules/areas/repositories/IAreasRepository';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import ILaboratoriosRepository from '@modules/laboratorios/repositories/ILaboratoriosRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateVagaIcDTO from '../dtos/ICreateVagaIcDTO';
import VagaIC from '../infra/typeorm/entities/VagaIC';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

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
    vl_bolsa,
    hr_semana,
    cr_minimo,
    periodo_minimo,
    nr_vagas,
    id_laboratorio,
    id_curso,
    id_professor,
    id_area,
  }: ICreateVagaIcDTO): Promise<VagaIC> {
    // Verificações de dados inválidos
    const laboratorio = await this.laboratoriosRepository.encontrarPeloId(
      id_laboratorio,
    );

    if (!laboratorio) {
      throw new AppError('Laboratório não existe.');
    }

    const curso = await this.cursosRepository.encontrarPeloId(id_curso);

    if (!curso) {
      throw new AppError('Curso não existe.');
    }

    if (id_area) {
      const area = await this.areasRepository.encontrarPeloId(id_area);

      if (!area) {
        throw new AppError('Área não existe.');
      }
    }

    const vagaEncontrada = await this.vagasIcRepository.encontrarVagaExistente({
      nome,
      id_laboratorio,
      id_curso,
    });

    if (vagaEncontrada) {
      throw new AppError('Vaga já cadastrada no sistema.');
    }

    if (vl_bolsa && vl_bolsa < 0) {
      throw new AppError('Valor da bolsa não pode ser negativo.');
    }

    if (hr_semana && (hr_semana < 0 || hr_semana > 20)) {
      throw new AppError('Horas semanais inválida. ');
    }

    if (cr_minimo && (cr_minimo < 0 || cr_minimo > 10)) {
      throw new AppError('CR mínimo inválido.');
    }

    if (periodo_minimo && (periodo_minimo < 1 || periodo_minimo > 10)) {
      throw new AppError('Período mínimo inválido.');
    }

    if (nr_vagas && nr_vagas < 0) {
      throw new AppError('Número de vagas não pode ser negativo.');
    }

    const vagaIC = await this.vagasIcRepository.create({
      nome,
      descricao,
      vl_bolsa,
      hr_semana,
      cr_minimo,
      periodo_minimo,
      nr_vagas,
      id_laboratorio,
      id_curso,
      id_professor,
      id_area,
    });

    return vagaIC;
  }
}

export default CreateVagaIcService;
