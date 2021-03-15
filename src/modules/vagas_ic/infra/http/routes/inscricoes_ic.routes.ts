import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import AlunosInscritosPorVagaIcController from '../controllers/AlunosInscritosPorVagaIcController';
import InscricoesIcController from '../controllers/InscricoesIcController';
import InscricoesIcPorAlunoController from '../controllers/InscricoesIcPorAlunoController';

const inscricaoIcRouter = Router();
inscricaoIcRouter.use(ensureAuthenticated);

const inscricoesIcController = new InscricoesIcController();
const inscricoesIcPorAlunoController = new InscricoesIcPorAlunoController();
const alunosInscritosPorVagaIcController = new AlunosInscritosPorVagaIcController();

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

inscricaoIcRouter.get('/me', inscricoesIcPorAlunoController.index);

inscricaoIcRouter.delete('/:id', inscricoesIcController.delete);

inscricaoIcRouter.get(
  '/:id',

  alunosInscritosPorVagaIcController.index,
);

export default inscricaoIcRouter;
