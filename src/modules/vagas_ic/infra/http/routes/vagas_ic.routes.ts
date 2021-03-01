import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import VagasIcController from '../controllers/VagasIcController';
import VagasIcPorAlunoController from '../controllers/VagasIcPorAlunoController';

const vagaIcRouter = Router();
vagaIcRouter.use(ensureAuthenticated);

const vagasIcController = new VagasIcController();
const vagasIcPorAlunoController = new VagasIcPorAlunoController();

vagaIcRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      descricao: Joi.string(),
      vl_bolsa: Joi.number(),
      hr_semana: Joi.number(),
      cr_minimo: Joi.number(),
      nr_vagas: Joi.number(),
      periodo_minimo: Joi.number(),
      id_laboratorio: Joi.string().uuid().required(),
      id_curso: Joi.string().uuid().required(),
      id_professor: Joi.string().uuid().required(),
      id_area: Joi.string().uuid(),
    },
  }),
  vagasIcController.create,
);
vagaIcRouter.get('/', vagasIcController.index);

vagaIcRouter.get('/me', vagasIcPorAlunoController.index);

export default vagaIcRouter;
