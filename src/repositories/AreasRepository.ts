import Area from '../models/Area';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Area)
class AreasRepository extends Repository<Area>{
  public async findByName(name: string): Promise<Area | undefined>{
    const findArea = await this.findOne({
      where: {
        name
      },
    });

    return findArea;
  }

}

export default AreasRepository;
