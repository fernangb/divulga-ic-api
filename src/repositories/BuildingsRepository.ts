import Building from '../models/Building';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Building)
class BuildingsRepository extends Repository<Building>{
  public async findByName(name: string): Promise<Building | undefined>{
    const findBuilding = await this.findOne({
      where: {
        name
      },
    });

    return findBuilding;
  }

}

export default BuildingsRepository;
