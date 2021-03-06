import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProfessoresController from '../controllers/ProfessoresController';
import ProfessoresUsuariosController from '../controllers/ProfessoresUsuariosController';

const professorRouter = Router();

const professoresController = new ProfessoresController();
const professoresUsuariosController = new ProfessoresUsuariosController();

professorRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      confirmacaoSenha: Joi.string().required().valid(Joi.ref('senha')),
      nome: Joi.string().required(),
      sobrenome: Joi.string().required(),
      siape: Joi.string().required(),
      curso: Joi.string().required(),
      laboratorio: Joi.string().required(),
    },
  }),
  professoresController.create,
);

professorRouter.get(
  '/:usuarioId',
  ensureAuthenticated,
  professoresUsuariosController.index,
);

professorRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      nome: Joi.string().required(),
      sobrenome: Joi.string().required(),
      siape: Joi.string().required(),
      curso: Joi.string().required(),
      laboratorio: Joi.string().required(),
    },
  }),
  professoresController.update,
);

export default professorRouter;
