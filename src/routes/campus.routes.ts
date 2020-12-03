import {Router} from 'express';
import CampusRepository from '../repositories/CampusRepository';
import CreateCampusService from '../services/CreateCampusService';
import {getCustomRepository} from 'typeorm';

const campusRouter = Router();

campusRouter.post('/', async (request, response) => {
  try{
    const {name, commonName, address} = request.body;

    const createCampus = new CreateCampusService();

    const campus = await createCampus.execute({
      name,
      address,
      commonName
    });

    return response.json(campus);
  }catch(err){
    return response.status(400).json({error: err.message});
  }
});

campusRouter.get('/', async(request, response) => {
  const campusRepository = getCustomRepository(CampusRepository);

  const campus = await campusRepository.find();

  return response.json(campus);
});

export default campusRouter;
