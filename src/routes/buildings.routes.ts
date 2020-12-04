import {Router} from 'express';
import BuildingsRepository from '../repositories/BuildingsRepository';
import CreateBuildingService from '../services/CreateBuildingService';
import {getCustomRepository} from 'typeorm';

const buildingRouter = Router();

buildingRouter.post('/', async (request, response) => {
  try{
    const {name, commonName, address, internalAddress, campus_id} = request.body;

    const createBuilding = new CreateBuildingService();

    const building = await createBuilding.execute({
      name,
      commonName,
      address,
      campus_id
    });

    return response.json(building);
  }catch(err){
    return response.status(400).json({error: err.message});
  }
});

buildingRouter.get('/', async(request, response) => {
  const buildingRepository = getCustomRepository(BuildingsRepository);

  const building = await buildingRepository.find();

  return response.json(building);
});

export default buildingRouter;
