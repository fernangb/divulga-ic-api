import { getRepository, Repository } from 'typeorm';
import VagaIc from '@modules/vagas_ic/infra/typeorm/entities/VagaIC';
import IVagasIcRepository from '@modules/vagas_ic/repositories/IVagasIcRepository';
import ICreateVagaIcDTO from '@modules/vagas_ic/dtos/ICreateVagaIcDTO';
import IVerificarVagasExistentesDTO from '@modules/vagas_ic/dtos/IVerificarVagasExistentesDTO';
import IListVagasIcPorAlunoDTO from '@modules/vagas_ic/dtos/IListVagasPorAlunoDTO';
import IListVagasIcCriadasPorProfessorDTO from '@modules/vagas_ic/dtos/IListVagasIcCriadasPorProfessorDTO';

class VagasIcRepository implements IVagasIcRepository {
  private ormRepository: Repository<VagaIc>;

  constructor() {
    this.ormRepository = getRepository(VagaIc);
  }

  public async create({
    nome,
    descricao,
    vl_bolsa,
    hr_semana,
    cr_minimo,
    periodo_minimo,
    id_laboratorio,
    id_curso,
    id_professor,
    id_area,
  }: ICreateVagaIcDTO): Promise<VagaIc> {
    const vagaIc = this.ormRepository.create({
      nome,
      descricao,
      vl_bolsa,
      hr_semana,
      cr_minimo,
      periodo_minimo,
      id_laboratorio,
      id_curso,
      id_professor,
      id_area,
    });

    await this.ormRepository.save(vagaIc);

    return vagaIc;
  }

  public async index(): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { es_aberta: true } });
  }

  public async encontrarVagaExistente({
    nome,
    id_curso,
    id_laboratorio,
  }: IVerificarVagasExistentesDTO): Promise<boolean> {
    const vagaEncontrada = await this.ormRepository.findOne({
      where: {
        nome,
        id_curso,
        id_laboratorio,
        es_aberta: true,
      },
    });

    if (!vagaEncontrada) return false;

    return true;
  }

  public async encontrarPeloNome(nome: string): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { nome, es_aberta: true } });
  }

  public async encontrarPeloId(id_vaga: string): Promise<VagaIc | undefined> {
    return this.ormRepository.findOne({ where: id_vaga });
  }

  public async encontrarPeloCurso(id_curso: string): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { id_curso, es_aberta: true } });
  }

  public async encontrarPeloLaboratorio(
    id_laboratorio: string,
  ): Promise<VagaIc[]> {
    return this.ormRepository.find({
      where: { id_laboratorio, es_aberta: true },
    });
  }

  public async encontrarPelaArea(id_area: string): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { id_area, es_aberta: true } });
  }

  public async encontrarVagasRecomendadasPorAluno({
    id_curso,
  }: IListVagasIcPorAlunoDTO): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { id_curso, es_aberta: true } });
  }

  public async listarVagasCriadasPeloProfessor({
    id_professor,
  }: IListVagasIcCriadasPorProfessorDTO): Promise<VagaIc[]> {
    return this.ormRepository.find({
      where: { id_professor, es_aberta: true },
    });
  }
}

export default VagasIcRepository;
