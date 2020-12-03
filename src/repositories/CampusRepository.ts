import Campus from '../models/Campus';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Campus)
class CampusRepository extends Repository<Campus>{
  public async findByName(name: string): Promise<Campus | undefined>{
    const findCampus = await this.findOne({
      where: {
        name
      },
    });

    return findCampus;
  }

}

export default CampusRepository;
