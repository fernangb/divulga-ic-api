import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import InscricoesIcController from '../controllers/InscricoesIcController';

const inscricaoIcRouter = Router();
inscricaoIcRouter.use(ensureAuthenticated);

const inscricoesIcController = new InscricoesIcController();

inscricaoIcRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      id_vaga: Joi.string().uuid().required(),
      id_aluno: Joi.string().uuid(),
    },
  }),
  inscricoesIcController.create,
);

inscricaoIcRouter.get('/me', inscricoesIcController.index);


export default inscricaoIcRouter;
