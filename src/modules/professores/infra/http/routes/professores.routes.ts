import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProfessoresController from '../controllers/ProfessoresController';

const professorRouter = Router();

const professoresController = new ProfessoresController();

professorRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      confirmacao_senha: Joi.string().required().valid(Joi.ref('senha')),
      nome: Joi.string().required(),
      siape: Joi.string().required(),
      id_curso: Joi.string().uuid().required(),
      id_nivel: Joi.string().uuid().required(),
      id_laboratorio: Joi.string().uuid().required(),
    },
  }),
  professoresController.create,
);

export default professorRouter;
