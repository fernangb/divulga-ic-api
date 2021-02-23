import { inject, injectable } from 'tsyringe';
import ICreateVagaIcDTO from '../dtos/ICreateVagaIcDTO';
import VagaIC from '../infra/typeorm/entities/VagaIC';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

@injectable()
class CreateVagaIcService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
  ) {}

  public async execute({
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
  }: ICreateVagaIcDTO): Promise<VagaIC> {
    const vagaIC = await this.vagasIcRepository.create({
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

    return vagaIC;
  }
}

export default CreateVagaIcService;
