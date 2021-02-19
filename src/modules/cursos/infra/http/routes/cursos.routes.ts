import { Router } from 'express';
// import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import CursosController from '../controllers/CursosController';

const cursosRouter = Router();

// cursosRouter.use(ensureAuthenticated);

const cursosController = new CursosController();

cursosRouter.post('/', cursosController.create);

// cursosRouter.get('/', async (request, response) => {

//   const cursos = await cursosRepository.find();

//   return response.json(cursos);
// });

export default cursosRouter;
