import { Router } from 'express';
import alunosRouter from './alunos.routes';
import areasRouter from './areas.routes';
import campusRouter from './campus.routes';
import cursosRouter from './cursos.routes';
import prediosRouter from './predios.routes';

const routes = Router();

routes.use('/alunos', alunosRouter);
routes.use('/areas', areasRouter);
routes.use('/campus', campusRouter);
routes.use('/cursos', cursosRouter);
routes.use('/predios', prediosRouter);

export default routes;
