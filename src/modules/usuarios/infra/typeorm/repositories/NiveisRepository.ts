import { getRepository, Repository } from 'typeorm';
import Nivel from '@modules/usuarios/infra/typeorm/entities/Nivel';
import INiveisRepository from '@modules/usuarios/repositories/INiveisRepository';
import ICreateNivelDTO from '@modules/usuarios/dtos/ICreateNivelDTO';

class NiveisRepository implements INiveisRepository {
  private ormRepository: Repository<Nivel>;

  constructor() {
    this.ormRepository = getRepository(Nivel);
  }

  public async encontrarPeloNome(nome: string): Promise<Nivel | undefined> {
    const nivelEncontrado = await this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return nivelEncontrado;
  }

  public async create({ nome }: ICreateNivelDTO): Promise<Nivel> {
    const nivel = this.ormRepository.create({ nome });

    await this.ormRepository.save(nivel);

    return nivel;
  }
}

export default NiveisRepository;
