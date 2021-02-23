import { Router } from 'express';
import VagasIcController from '../controllers/VagasIcController';

const vagaIcRouter = Router();
// vagaIcRouter.use(ensureAuthenticated);

const vagasIcController = new VagasIcController();

vagaIcRouter.post('/', vagasIcController.create);
vagaIcRouter.get('/', vagasIcController.list);

export default vagaIcRouter;
