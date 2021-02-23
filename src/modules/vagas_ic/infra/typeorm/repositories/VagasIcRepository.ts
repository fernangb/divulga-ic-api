import { getRepository, Repository } from 'typeorm';
import VagaIc from '@modules/vagas_ic/infra/typeorm/entities/VagaIC';
import IVagasIcRepository from '@modules/vagas_ic/repositories/IVagasIcRepository';
import ICreateVagaIcDTO from '@modules/vagas_ic/dtos/ICreateVagaIcDTO';

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

  public async list(): Promise<VagaIc[]> {
    return this.ormRepository.find();
  }
}

export default VagasIcRepository;
