import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import NiveisController from '../controllers/NiveisController';
import NiveisPorNomeController from '../controllers/NiveisPorNomeController';

const nivelRouter = Router();

const niveisController = new NiveisController();
const niveisPorNomeController = new NiveisPorNomeController();

nivelRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
    },
  }),
  niveisController.create,
);

nivelRouter.get(
  '/:nome',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
    },
  }),
  niveisPorNomeController.index,
);

export default nivelRouter;
