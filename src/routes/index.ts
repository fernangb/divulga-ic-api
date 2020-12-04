import { Router } from 'express';
import areasRouter from './areas.routes';
import buildingsRouter from './buildings.routes';
import campusRouter from './campus.routes';
import coursesRouter from './courses.routes';
import studentsRouter from './students.routes';

const routes = Router();

routes.use('/areas', areasRouter);
routes.use('/buildings', buildingsRouter);
routes.use('/campus', campusRouter);
routes.use('/courses', coursesRouter);
routes.use('/students', studentsRouter);

export default routes;
