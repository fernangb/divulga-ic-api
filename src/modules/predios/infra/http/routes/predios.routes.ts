import { Router } from 'express';
import PrediosController from '../controllers/PrediosController';

const predioRouter = Router();

const prediosController = new PrediosController();

predioRouter.post('/', prediosController.create);

// predioRouter.get('/', async (request, response) => {

//   const predio = await predioRepository.find();

//   return response.json(predio);
// });

export default predioRouter;
