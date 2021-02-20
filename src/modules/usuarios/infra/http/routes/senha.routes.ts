import { Router } from 'express';
import EsquecerSenhaController from '../controllers/EsquecerSenhaController';
import ResetarSenhaController from '../controllers/ResetarSenhaController';

const senhaRouter = Router();

const esquecerSenhaController = new EsquecerSenhaController();
const resetarSenhaController = new ResetarSenhaController();

senhaRouter.post('/esquecer', esquecerSenhaController.create);
senhaRouter.post('/resetar', resetarSenhaController.create);

export default senhaRouter;
