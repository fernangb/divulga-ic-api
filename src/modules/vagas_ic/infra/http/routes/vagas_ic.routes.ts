import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import { Router } from 'express';
import VagasIcController from '../controllers/VagasIcController';
import VagasIcPorAlunoController from '../controllers/VagasIcPorAlunoController';

const vagaIcRouter = Router();
vagaIcRouter.use(ensureAuthenticated);

const vagasIcController = new VagasIcController();
const vagasIcPorAlunoController = new VagasIcPorAlunoController();

vagaIcRouter.post('/', vagasIcController.create);
vagaIcRouter.get('/', vagasIcController.index);

vagaIcRouter.get('/me', vagasIcPorAlunoController.index);

export default vagaIcRouter;
