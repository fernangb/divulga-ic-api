import { getRepository, Repository } from 'typeorm';
import Campus from '@modules/campus/infra/typeorm/entities/Campus';
import ICampusRepository from '@modules/campus/repositories/ICampusRepository';
import ICreateCampusDTO from '@modules/campus/dtos/ICreateCampusDTO';

class CampusRepository implements ICampusRepository {
  private ormRepository: Repository<Campus>;

  constructor() {
    this.ormRepository = getRepository(Campus);
  }

  public async procurarPeloNome(nome: string): Promise<Campus | undefined> {
    const campusEncontrado = await this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return campusEncontrado;
  }

  public async create({
    nome,
    nome_comum,
    endereco,
  }: ICreateCampusDTO): Promise<Campus> {
    const campus = this.ormRepository.create({ nome, nome_comum, endereco });

    await this.ormRepository.save(campus);

    return campus;
  }
}

export default CampusRepository;
