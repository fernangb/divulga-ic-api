import { Router } from 'express';
import InscricoesIcController from '../controllers/InscricoesIcController';

const inscricaoIcRouter = Router();
// inscricaoIcRouter.use(ensureAuthenticated);

const inscricoesIcController = new InscricoesIcController();

inscricaoIcRouter.post('/', inscricoesIcController.create);
inscricaoIcRouter.get('/', inscricoesIcController.index);

export default inscricaoIcRouter;
