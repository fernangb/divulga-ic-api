import IAreasRepository from '@modules/areas/repositories/IAreasRepository';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import ILaboratoriosRepository from '@modules/laboratorios/repositories/ILaboratoriosRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import VagaIC from '../infra/typeorm/entities/VagaIC';
import IAreasVagasIcRepository from '../repositories/IAreasVagasIcRepository';
import ICursosVagasIcRepository from '../repositories/ICursosVagasIcRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

interface IRequest {
  nome: string;
  descricao?: string;
  vl_bolsa?: number;
  hr_semana?: number;
  cr_minimo?: number;
  nr_vagas?: number;
  periodo_minimo?: number;
  id_laboratorio: string;
  cursos: string[];
  id_professor: string;
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
    @inject('CursosVagasIcRepository')
    private cursosVagasIcRepository: ICursosVagasIcRepository,
    @inject('AreasVagasIcRepository')
    private areasVagasIcRepository: IAreasVagasIcRepository,
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
    cursos,
    id_professor,
    areas,
  }: IRequest): Promise<VagaIC> {
    const laboratorio = await this.laboratoriosRepository.encontrarPeloId(
      id_laboratorio,
    );

    if (!laboratorio) {
      throw new AppError('Laboratório não existe.');
    }

    // if(cursos){
    //   cursos.map(curso => {
    //     const cursoExistente = this.cursosRepository.encontrarPeloId(curso);

    //     if (!cursoExistente) {
    //       throw new AppError('Curso não existe.');
    //     }

    //   });
    // }


    // if(areas){
    //   areas.map(area => {
    //     const areaExistente = this.areasRepository.encontrarPeloId(area);

    //     if (!areaExistente) {
    //       throw new AppError('Área não existe.');
    //     }

    //   });
    // }


    const vagaEncontrada = await this.vagasIcRepository.encontrarVagaExistente({
      nome,
      id_laboratorio,
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

    const areasExistentes = await this.areasRepository.encontrarPelosNomes(areas);

    console.log('Areas existentes: ',areasExistentes);

    const areaIds = areasExistentes.map(area => area.id);

    // const encontrarAreasInexistentes = areas.filter(area => !are);

    console.log(areasExistentes)

    const areasSerializadas = areasExistentes.map(area => ({
      id: area.id,
      nome: area.nome,
    }))

    const vagaIC = await this.vagasIcRepository.create({
      nome,
      descricao,
      vl_bolsa,
      hr_semana,
      cr_minimo,
      periodo_minimo,
      nr_vagas,
      id_laboratorio,
      id_professor,
    });


    areasExistentes.map(area => {
       this.areasVagasIcRepository.create({id_area: area.id, id_vaga: vagaIC.id});
    })


    return vagaIC;
  }
}

export default CreateVagaIcService;
