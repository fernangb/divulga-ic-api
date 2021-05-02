import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CursosController from '../controllers/CursosController';

const cursosRouter = Router();

const cursosController = new CursosController();

cursosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      endereco: Joi.string().required(),
      nrPeriodos: Joi.number().required(),
      tipo: Joi.string().required(),
      turno: Joi.string().required(),
      predioId: Joi.string().uuid().required(),
    },
  }),
  cursosController.create,
);

cursosRouter.get('/', cursosController.index);

export default cursosRouter;
