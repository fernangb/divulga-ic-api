import { Router } from 'express';

import AreasController from '../controllers/AreasController';

const areaRouter = Router();
const areasController = new AreasController();

areaRouter.post('/', areasController.create);
areaRouter.get('/', areasController.index);

// areaRouter.get('/', async (request, response) => {
//   const area = await areasRepository.find();

//   return response.json(area);
// });

export default areaRouter;
