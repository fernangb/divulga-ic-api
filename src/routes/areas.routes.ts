import {Router} from 'express';
import AreasRepository from '../repositories/AreasRepository';
import CreateAreaService from '../services/CreateAreaService';
import {getCustomRepository} from 'typeorm';

const areaRouter = Router();

areaRouter.post('/', async (request, response) => {
  try{
    const {nome} = request.body;

    const createArea = new CreateAreaService();

    const area = await createArea.execute({
      nome
    });

    return response.json(area);
  }catch(err){
    return response.status(400).json({error: err.message});
  }
});

areaRouter.get('/', async(request, response) => {
  const areaRepository = getCustomRepository(AreasRepository);

  const area = await areaRepository.find();

  return response.json(area);
});

export default areaRouter;
