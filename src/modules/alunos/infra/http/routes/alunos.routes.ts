import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import AlunosController from '../controllers/AlunosController';
import AlunosUsuariosController from '../controllers/AlunosUsuariosController';

const alunoRouter = Router();

const alunosController = new AlunosController();
const alunosUsuariosController = new AlunosUsuariosController();

alunoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      confirmacao_senha: Joi.string().required().valid(Joi.ref('senha')),
      nome: Joi.string().required(),
      sobrenome: Joi.string().required(),
      dre: Joi.string().required(),
      periodo: Joi.number().required(),
      id_curso: Joi.string().uuid().required(),
      id_nivel: Joi.string().uuid().required(),
    },
  }),
  alunosController.create,
);

alunoRouter.get(
  '/:id_usuario',
  ensureAuthenticated,
  alunosUsuariosController.index,
);

export default alunoRouter;
