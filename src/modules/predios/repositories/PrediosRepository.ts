import { EntityRepository, Repository } from 'typeorm';
import Predio from '../entities/Predio';

@EntityRepository(Predio)
class PrediosRepository extends Repository<Predio> {
  public async procurarPeloNome(nome: string): Promise<Predio | undefined> {
    const predioEncontrado = await this.findOne({
      where: {
        nome,
      },
    });

    return predioEncontrado;
  }
}

export default PrediosRepository;
