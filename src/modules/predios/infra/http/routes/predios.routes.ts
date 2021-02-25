import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import PrediosController from '../controllers/PrediosController';

const predioRouter = Router();

const prediosController = new PrediosController();

predioRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.number().required(),
      nome_comum: Joi.number().required(),
      endereco: Joi.number().required(),
      id_campus: Joi.string().uuid().required(),
    },
  }),
  prediosController.create,
);

// predioRouter.get('/', async (request, response) => {

//   const predio = await predioRepository.find();

//   return response.json(predio);
// });

export default predioRouter;
