import { Router } from 'express';
import cursosRouter from './cursos.routes';

const routes = Router();

routes.use('/cursos', cursosRouter);

export default routes;
