import { Router } from 'express';
import LaboratoriosController from '../controllers/LaboratoriosController';

const laboratoriosRouter = Router();

const laboratoriosController = new LaboratoriosController();

laboratoriosRouter.post('/', laboratoriosController.create);
laboratoriosRouter.get('/', laboratoriosController.index);

export default laboratoriosRouter;
