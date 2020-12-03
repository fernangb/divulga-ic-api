import Area from '../models/Area';
import AreasRepository from '../repositories/AreasRepository';
import {getCustomRepository} from 'typeorm';

interface AreaDTO {
  name: string;
}

class CreateAreaService {
  public async execute({name}: AreaDTO): Promise<Area>{
    const areasRepository = getCustomRepository(AreasRepository);

    const findArea = await areasRepository.findByName(name);

    if(findArea){
      throw Error('Área já cadastrada no sistema.');
    }

    const area = areasRepository.create({name});

    await areasRepository.save(area);

    return area;
  }
}

export default CreateAreaService;
