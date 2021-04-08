import { getRepository, In, Repository } from 'typeorm';
import IAreasVagasIcRepository from '@modules/vagas_ic/repositories/IAreasVagasIcRepository';
import VagaIcAreas from '../entities/AreasVagasIC';
import ICreateVagaIcAreasDTO from '@modules/vagas_ic/dtos/ICreateVagaIcAreasDTO';

class AreasVagasIcRepository implements IAreasVagasIcRepository {
  private ormRepository: Repository<VagaIcAreas>;

  constructor() {
    this.ormRepository = getRepository(VagaIcAreas);
  }

  public async create({id_area, id_vaga}: ICreateVagaIcAreasDTO): Promise<VagaIcAreas> {
    const vagaArea = this.ormRepository.create({
      id_vaga,
      id_area,
    });

    await this.ormRepository.save(vagaArea);

    return vagaArea;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async listarPorVagaIc(id_vaga: string): Promise<VagaIcAreas[]> {
    return this.ormRepository.find({ where: { id_vaga} });
  }

}

export default AreasVagasIcRepository;
