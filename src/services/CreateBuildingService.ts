import Building from '../models/Building';
import BuildingsRepository from '../repositories/BuildingsRepository';
import {getCustomRepository} from 'typeorm';

interface BuildingDTO {
  name: string;
  commonName: string;
  address: string;
  campus_id: string;
}

class CreateBuildingService {
  public async execute({name, commonName, address, campus_id}: BuildingDTO): Promise<Building>{
    const buildingsRepository = getCustomRepository(BuildingsRepository);

    const checkBuildingExists = await buildingsRepository.findByName(name);

    if(checkBuildingExists){
      throw new Error('Prédio já cadastrado no sistema.');
    }

    const building = buildingsRepository.create({name, commonName, address, campus_id});

    await buildingsRepository.save(building);

    return building;
  }
}

export default CreateBuildingService;
