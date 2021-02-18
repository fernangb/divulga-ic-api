import { EntityRepository, Repository } from 'typeorm';
import Predio from '@modules/predios/infra/typeorm/entities/Predio';
import IPrediosRepository from '@modules/predios/repositories/IPrediosRepository';

@EntityRepository(Predio)
class PrediosRepository
  extends Repository<Predio>
  implements IPrediosRepository {
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
