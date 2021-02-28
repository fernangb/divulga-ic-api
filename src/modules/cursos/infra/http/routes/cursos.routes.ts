import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
// import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import CursosController from '../controllers/CursosController';

const cursosRouter = Router();

// cursosRouter.use(ensureAuthenticated);

const cursosController = new CursosController();

cursosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      endereco: Joi.string().required(),
      nr_periodos: Joi.number().required(),
      tipo: Joi.string().required(),
      turno: Joi.string().required(),
      id_predio: Joi.string().uuid().required(),
    },
  }),
  cursosController.create,
);

cursosRouter.get('/', cursosController.index);

//   const cursos = await cursosRepository.find();

//   return response.json(cursos);
// });

export default cursosRouter;
