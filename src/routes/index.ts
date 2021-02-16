import { Router } from 'express';
import authRouter from './auth.routes';
import alunosRouter from './alunos.routes';
import areasRouter from './areas.routes';
import campusRouter from './campus.routes';
import cursosRouter from './cursos.routes';
import prediosRouter from './predios.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/alunos', alunosRouter);
routes.use('/areas', areasRouter);
routes.use('/campus', campusRouter);
routes.use('/cursos', cursosRouter);
routes.use('/predios', prediosRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
