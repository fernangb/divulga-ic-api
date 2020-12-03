import { Router } from 'express';
import coursesRouter from './courses.routes';
import campusRouter from './campus.routes';
import areasRouter from './areas.routes';

const routes = Router();

routes.use('/courses', coursesRouter);
routes.use('/campus', campusRouter);
routes.use('/areas', areasRouter);

export default routes;
