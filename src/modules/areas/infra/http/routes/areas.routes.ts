import { Router } from 'express';
import AreasRepository from '@modules/areas/infra/typeorm/repositories/AreasRepository';
import CreateAreaService from '@modules/areas/services/CreateAreaService';

const areaRouter = Router();
const areasRepository = new AreasRepository();

areaRouter.post('/', async (request, response) => {
  const { nome } = request.body;

  const createArea = new CreateAreaService(areasRepository);

  const area = await createArea.execute({
    nome,
  });

  return response.json(area);
});

// areaRouter.get('/', async (request, response) => {
//   const area = await areasRepository.find();

//   return response.json(area);
// });

export default areaRouter;
