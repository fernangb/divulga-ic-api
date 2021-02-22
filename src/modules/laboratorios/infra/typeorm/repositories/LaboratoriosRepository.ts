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

  public async ordenar(laboratorios: Laboratorio[]): Promise<Laboratorio[]> {
    return laboratorios.sort((a, b) => (a.nome > b.nome ? 1 : -1));
  }

  public async create({
    nome,
    sigla,
    sala,
    id_predio,
  }: ICreateLaboratorioDTO): Promise<Laboratorio> {
    const laboratorio = this.ormRepository.create({
      nome,
      sigla,
      sala,
      id_predio,
    });

    await this.ormRepository.save(laboratorio);

    return laboratorio;
  }

  public async save(laboratorio: Laboratorio): Promise<Laboratorio> {
    return this.ormRepository.save(laboratorio);
  }

  public async list(): Promise<Laboratorio[]> {
    return this.ormRepository.find();
  }
}

export default LaboratoriosRepository;
