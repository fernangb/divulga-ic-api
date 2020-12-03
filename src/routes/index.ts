import { Router } from 'express';
import coursesRouter from './courses.routes';
import campusRouter from './campus.routes';

const routes = Router();

routes.use('/courses', coursesRouter);
routes.use('/campus', campusRouter);

export default routes;
