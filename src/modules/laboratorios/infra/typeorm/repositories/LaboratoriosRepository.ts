import { getRepository, Repository } from 'typeorm';
import Laboratorio from '@modules/laboratorios/infra/typeorm/entities/Laboratorio';
import ILaboratoriosRepository from '@modules/laboratorios/repositories/ILaboratoriosRepository';
import ICreateLaboratorioDTO from '@modules/laboratorios/dtos/ICreateLaboratorioDTO';

class LaboratoriosRepository implements ILaboratoriosRepository {
  private ormRepository: Repository<Laboratorio>;

  constructor() {
    this.ormRepository = getRepository(Laboratorio);
  }

  public async encontrarPeloId(id: string): Promise<Laboratorio | undefined> {
    const laboratorioEncontrado = await this.ormRepository.findOne(id);

    return laboratorioEncontrado;
  }

  public async encontrarPelaSigla(
    sigla: string,
  ): Promise<Laboratorio | undefined> {
    const laboratorioEncontrado = await this.ormRepository.findOne({
      where: {
        sigla,
      },
    });

    return laboratorioEncontrado;
  }

  public async create({
    nome,
    sigla,
    sala,
    predioId,
  }: ICreateLaboratorioDTO): Promise<Laboratorio> {
    const laboratorio = this.ormRepository.create({
      nome,
      sigla,
      sala,
      predioId,
    });

    await this.ormRepository.save(laboratorio);

    return laboratorio;
  }

  public async save(laboratorio: Laboratorio): Promise<Laboratorio> {
    return this.ormRepository.save(laboratorio);
  }

  public async index(): Promise<Laboratorio[]> {
    return this.ormRepository.find({
      order: {
        sigla: 'ASC',
      },
    });
  }
}

export default LaboratoriosRepository;
