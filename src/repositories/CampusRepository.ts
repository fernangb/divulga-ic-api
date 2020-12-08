import Campus from '../models/Campus';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Campus)
class CampusRepository extends Repository<Campus>{
  public async procurarPeloNome(nome: string): Promise<Campus | undefined>{
    const campusEncontrado = await this.findOne({
      where: {
        nome
      },
    });

    return campusEncontrado;
  }

}

export default CampusRepository;
