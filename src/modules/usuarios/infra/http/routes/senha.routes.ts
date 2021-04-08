import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import EsquecerSenhaController from '../controllers/EsquecerSenhaController';
import ResetarSenhaController from '../controllers/ResetarSenhaController';

const senhaRouter = Router();

const esquecerSenhaController = new EsquecerSenhaController();
const resetarSenhaController = new ResetarSenhaController();

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

export default senhaRouter;
