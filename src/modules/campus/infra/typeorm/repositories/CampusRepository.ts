import { EntityRepository, Repository } from 'typeorm';
import Campus from '@modules/campus/infra/typeorm/entities/Campus';
import ICampusRepository from '@modules/campus/repositories/ICampusRepository';

@EntityRepository(Campus)
class CampusRepository extends Repository<Campus> implements ICampusRepository {
  public async procurarPeloNome(nome: string): Promise<Campus | undefined> {
    const campusEncontrado = await this.findOne({
      where: {
        nome,
      },
    });

    return campusEncontrado;
  }
}

export default CampusRepository;
