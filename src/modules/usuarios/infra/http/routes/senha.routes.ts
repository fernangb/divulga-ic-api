import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import EsquecerSenhaController from '../controllers/EsquecerSenhaController';
import ResetarSenhaController from '../controllers/ResetarSenhaController';
import SenhaController from '../controllers/SenhaController';

const senhaRouter = Router();

const esquecerSenhaController = new EsquecerSenhaController();
const resetarSenhaController = new ResetarSenhaController();
const senhaController = new SenhaController();

senhaRouter.post(
  '/esquecer',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  esquecerSenhaController.create,
);
senhaRouter.post(
  '/resetar',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      senha: Joi.string().required(),
      confirmacaoSenha: Joi.string().required().valid(Joi.ref('senha')),
    },
  }),
  resetarSenhaController.create,
);

senhaRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      senha: Joi.string().required(),
      novaSenha: Joi.string().required(),
    },
  }),
  senhaController.update,
);

export default senhaRouter;
