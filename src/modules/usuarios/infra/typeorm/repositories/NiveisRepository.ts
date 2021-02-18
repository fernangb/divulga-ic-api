import { EntityRepository, Repository } from 'typeorm';
import Nivel from '@modules/usuarios/infra/typeorm/entities/Nivel';
import INiveisRepository from '@modules/usuarios/repositories/INiveisRepository';

@EntityRepository(Nivel)
class NiveisRepository extends Repository<Nivel> implements INiveisRepository {
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
