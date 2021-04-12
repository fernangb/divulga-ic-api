import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import AlunosInscritosPorVagaIcController from '../controllers/AlunosInscritosPorVagaIcController';
import AtivarVagaIcController from '../controllers/AtivarVagaIcController';
import EncerrarVagaIcController from '../controllers/EncerrarVagaIcController';
import VagasIcController from '../controllers/VagasIcController';
import VagasIcCriadasPorProfessorController from '../controllers/VagasIcCriadasPorProfessorController';
import VagasIcPorAlunoController from '../controllers/VagasIcPorAlunoController';

const vagaIcRouter = Router();
vagaIcRouter.use(ensureAuthenticated);

const vagasIcController = new VagasIcController();
const vagasIcPorAlunoController = new VagasIcPorAlunoController();
const vagasIcCriadasPorProfessorController = new VagasIcCriadasPorProfessorController();
const encerrarVagaIc = new EncerrarVagaIcController();
const ativarVagaIc = new AtivarVagaIcController();

vagaIcRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     nome: Joi.string().required(),
  //     descricao: Joi.string(),
  //     vlBolsa: Joi.number(),
  //     hrSemana: Joi.number(),
  //     crMinimo: Joi.number(),
  //     nrVagas: Joi.number(),
  //     periodoMinimo: Joi.number(),
  //     laboratorioId: Joi.string().uuid().required(),
  //     professorId: Joi.string().uuid().required(),
  //   },
  // }),
  vagasIcController.create,
);
vagaIcRouter.get('/', vagasIcController.index);

vagaIcRouter.get('/aluno/me', vagasIcPorAlunoController.index);

vagaIcRouter.get('/professor/me', vagasIcCriadasPorProfessorController.index);

vagaIcRouter.put('/', vagasIcController.update);

vagaIcRouter.put('/encerrar/:id', encerrarVagaIc.update);

vagaIcRouter.put('/ativar/:id', ativarVagaIc.update);

vagaIcRouter.delete('/:id', vagasIcController.delete);

export default vagaIcRouter;
