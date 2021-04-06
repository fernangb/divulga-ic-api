import { getRepository, In, Repository } from 'typeorm';
import IVagaIcCursosRepository from '@modules/vagas_ic/repositories/IVagaIcCursosRepository';
import VagaIcCursos from '../entities/VagaIcCursos';
import ICreateVagaIcCursosDTO from '@modules/vagas_ic/dtos/ICreateVagaIcCursosDTO';

class VagaIcCursosRepository implements IVagaIcCursosRepository {
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

export default VagaIcCursosRepository;
