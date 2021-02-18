import { Router } from 'express';
import CreateAreaService from '@modules/areas/services/CreateAreaService';
import { container } from 'tsyringe';

const areaRouter = Router();

areaRouter.post('/', async (request, response) => {
  const { nome } = request.body;

  const createArea = container.resolve(CreateAreaService);

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
