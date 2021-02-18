import { EntityRepository, Repository } from 'typeorm';
import Nivel from '../entities/Nivel';

@EntityRepository(Nivel)
class NiveisRepository extends Repository<Nivel> {
  public async procurarPeloNome(nome: string): Promise<Nivel | undefined> {
    const nivelEncontrado = await this.findOne({
      where: {
        nome,
      },
    });

    return nivelEncontrado;
  }
}

export default NiveisRepository;
