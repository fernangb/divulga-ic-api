import Predio from '../models/Predio';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Predio)
class PrediosRepository extends Repository<Predio>{
  public async procurarPeloNome(nome: string): Promise<Predio | undefined>{
    const predioEncontrado = await this.findOne({
      where: {
        nome
      },
    });

    return predioEncontrado;
  }

}

export default PrediosRepository;
