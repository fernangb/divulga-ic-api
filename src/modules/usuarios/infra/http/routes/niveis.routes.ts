import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import NiveisController from '../controllers/NiveisController';

const nivelRouter = Router();

const niveisController = new NiveisController();

nivelRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
    },
  }),
  niveisController.create,
);

// nivelRouter.get('/', async (request, response) => {

//   const nivel = await nivelRepository.find();

//   return response.json(nivel);
// });

export default nivelRouter;
