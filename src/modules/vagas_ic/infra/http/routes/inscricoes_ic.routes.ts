import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import AlunosInscritosPorProfessorController from '../controllers/AlunosInscritosPorProfessorController';
import AlunosInscritosPorVagaIcController from '../controllers/AlunosInscritosPorVagaIcController';
import InscricoesIcController from '../controllers/InscricoesIcController';
import InscricoesIcPorAlunoController from '../controllers/InscricoesIcPorAlunoController';

const inscricaoIcRouter = Router();
inscricaoIcRouter.use(ensureAuthenticated);

const inscricoesIcController = new InscricoesIcController();
const inscricoesIcPorAlunoController = new InscricoesIcPorAlunoController();
const alunosInscritosPorVagaIcController = new AlunosInscritosPorVagaIcController();
const alunosInscritosPorProfessorController = new AlunosInscritosPorProfessorController();

inscricaoIcRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      vagaIcId: Joi.string().uuid().required(),
      alunoId: Joi.string().uuid(),
    },
  }),
  inscricoesIcController.create,
);

inscricaoIcRouter.get('/me', inscricoesIcPorAlunoController.index);

inscricaoIcRouter.delete('/:id', inscricoesIcController.delete);

inscricaoIcRouter.get('/:id', alunosInscritosPorVagaIcController.index);

inscricaoIcRouter.get(
  '/professor/:id',
  alunosInscritosPorProfessorController.index,
);

export default inscricaoIcRouter;
