import { Router } from 'express';
import LaboratoriosController from '../controllers/LaboratoriosController';

const laboratoriosRouter = Router();

const laboratoriosController = new LaboratoriosController();

laboratoriosRouter.post('/', laboratoriosController.create);

export default laboratoriosRouter;
