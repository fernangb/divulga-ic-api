import { EntityRepository, Repository } from 'typeorm';
import Area from '@modules/areas/infra/typeorm/entities/Area';

@EntityRepository(Area)
class AreasRepository extends Repository<Area> {
  public async procurarPeloNome(nome: string): Promise<Area | undefined> {
    const areaEncontrada = await this.findOne({
      where: {
        nome,
      },
    });

    return areaEncontrada;
  }
}

export default AreasRepository;
