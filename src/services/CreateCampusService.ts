import Campus from '../models/Campus';
import CampusRepository from '../repositories/CampusRepository';
import {getCustomRepository} from 'typeorm';

interface CampusDTO {
  name: string;
  address:  string;
  commonName: string;
}

class CreateCampusService {
  public async execute({name,address, commonName}: CampusDTO): Promise<Campus>{
    const campusRepository = getCustomRepository(CampusRepository);

    const checkCampusExists = await campusRepository.findByName(name);

    if(checkCampusExists){
      throw new Error('Campus já cadastrado no sistema.');
    }

    const campus = campusRepository.create({name,address, commonName});

    await campusRepository.save(campus);

    return campus;
  }
}

export default CreateCampusService;
