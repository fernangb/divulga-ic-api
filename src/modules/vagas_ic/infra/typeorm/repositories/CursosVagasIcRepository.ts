import { getRepository, In, Repository } from 'typeorm';
import ICursosVagasIcRepository from '@modules/vagas_ic/repositories/ICursosVagasIcRepository';
import VagaIcCursos from '../entities/CursosVagasIC';
import ICreateVagaIcCursosDTO from '@modules/vagas_ic/dtos/ICreateVagaIcCursosDTO';

class CursosVagasIcRepository implements ICursosVagasIcRepository {
  private ormRepository: Repository<VagaIcCursos>;

  constructor() {
    this.ormRepository = getRepository(VagaIcCursos);
  }

  public async create({id_curso, id_vaga}: ICreateVagaIcCursosDTO): Promise<VagaIcCursos> {
    const vagaCurso = this.ormRepository.create({
      id_vaga,
      id_curso,
    });

    await this.ormRepository.save(vagaCurso);

    return vagaCurso;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async listarPorVagaIc(id_vaga: string): Promise<VagaIcCursos[]> {
    return this.ormRepository.find({ where: { id_vaga} });
  }

}

export default CursosVagasIcRepository;
