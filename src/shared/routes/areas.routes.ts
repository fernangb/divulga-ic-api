import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AreasRepository from '../../modules/areas/repositories/AreasRepository';
import CreateAreaService from '../../modules/areas/services/CreateAreaService';

const areaRouter = Router();

areaRouter.post('/', async (request, response) => {
  const { nome } = request.body;

  const createArea = new CreateAreaService();

  const area = await createArea.execute({
    nome,
  });

  return response.json(area);
});

areaRouter.get('/', async (request, response) => {
  const areaRepository = getCustomRepository(AreasRepository);

  const area = await areaRepository.find();

  return response.json(area);
});

export default areaRouter;
