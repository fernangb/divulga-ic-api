import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AlunosController from '../controllers/AlunosController';

const alunoRouter = Router();

const alunosController = new AlunosController();

alunoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      confirmacao_senha: Joi.string().required().valid(Joi.ref('senha')),
      nome: Joi.string().required(),
      dre: Joi.string().required(),
      periodo: Joi.number().required(),
      id_curso: Joi.string().uuid().required(),
      id_nivel: Joi.string().uuid().required(),
    },
  }),
  alunosController.create,
);

export default alunoRouter;
