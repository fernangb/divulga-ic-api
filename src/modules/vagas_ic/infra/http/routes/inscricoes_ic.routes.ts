import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import { Router } from 'express';
import InscricoesIcController from '../controllers/InscricoesIcController';

const inscricaoIcRouter = Router();
inscricaoIcRouter.use(ensureAuthenticated);

const inscricoesIcController = new InscricoesIcController();

inscricaoIcRouter.post('/', inscricoesIcController.create);
inscricaoIcRouter.get('/', inscricoesIcController.index);

export default inscricaoIcRouter;
