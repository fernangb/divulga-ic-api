import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import AreasController from '../controllers/AreasController';

const areaRouter = Router();
const areasController = new AreasController();

areaRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
    },
  }),
  areasController.create,
);
areaRouter.get('/', areasController.index);

// areaRouter.get('/', async (request, response) => {
//   const area = await areasRepository.find();

//   return response.json(area);
// });

export default areaRouter;
