import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import LaboratoriosController from '../controllers/LaboratoriosController';

const laboratoriosRouter = Router();

const laboratoriosController = new LaboratoriosController();

laboratoriosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      sigla: Joi.string().required(),
      sala: Joi.string().required(),
      id_predio: Joi.string().uuid().required(),
    },
  }),
  laboratoriosController.create,
);
laboratoriosRouter.get('/', laboratoriosController.index);

export default laboratoriosRouter;
