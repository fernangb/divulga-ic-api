import { Router } from 'express';
import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import PerfilController from '../controllers/PerfilController';

const perfilRouter = Router();

const perfilController = new PerfilController();

perfilRouter.use(ensureAuthenticated);

perfilRouter.get('/', perfilController.show);
perfilRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string(),
      senha_antiga: Joi.string(),
      confirmacaoSenha: Joi.string().valid(Joi.ref('senha')),
      nome: Joi.string().required(),
    },
  }),
  perfilController.update,
);

export default perfilRouter;
