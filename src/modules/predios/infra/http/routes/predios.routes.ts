import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import PrediosController from '../controllers/PrediosController';

const predioRouter = Router();

const prediosController = new PrediosController();

predioRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      nomeComum: Joi.string().required(),
      endereco: Joi.string().required(),
    },
  }),
  prediosController.create,
);

predioRouter.get('/', prediosController.index);

export default predioRouter;
