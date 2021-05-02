import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import { Router } from 'express';
import AtivarVagaIcController from '../controllers/AtivarVagaIcController';
import EncerrarVagaIcController from '../controllers/EncerrarVagaIcController';
import VagasIcController from '../controllers/VagasIcController';
import VagasIcCriadasPorProfessorController from '../controllers/VagasIcCriadasPorProfessorController';
import VagasIcFiltradasController from '../controllers/VagasIcFiltradasController';
import VagasIcPorAlunoController from '../controllers/VagasIcPorAlunoController';

const vagaIcRouter = Router();
vagaIcRouter.use(ensureAuthenticated);

const vagasIcController = new VagasIcController();
const vagasIcPorAlunoController = new VagasIcPorAlunoController();
const vagasIcCriadasPorProfessorController = new VagasIcCriadasPorProfessorController();
const encerrarVagaIc = new EncerrarVagaIcController();
const ativarVagaIc = new AtivarVagaIcController();
const vagasIcFiltradasController = new VagasIcFiltradasController();

vagaIcRouter.post('/', vagasIcController.create);

vagaIcRouter.get('/', vagasIcController.index);

vagaIcRouter.put('/', vagasIcController.update);

vagaIcRouter.delete('/:id', vagasIcController.delete);

vagaIcRouter.get('/aluno/me', vagasIcPorAlunoController.index);

vagaIcRouter.get('/professor/me', vagasIcCriadasPorProfessorController.index);

vagaIcRouter.put('/encerrar/:id', encerrarVagaIc.update);

vagaIcRouter.put('/ativar/:id', ativarVagaIc.update);

vagaIcRouter.get('/search', vagasIcFiltradasController.index);

export default vagaIcRouter;
