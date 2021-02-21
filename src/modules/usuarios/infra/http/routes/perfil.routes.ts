import { Router } from 'express';
import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import PerfilController from '../controllers/PerfilController';

const perfilRouter = Router();

const perfilController = new PerfilController();

perfilRouter.use(ensureAuthenticated);

perfilRouter.get('/', perfilController.show);
perfilRouter.put('/', perfilController.update);

export default perfilRouter;
