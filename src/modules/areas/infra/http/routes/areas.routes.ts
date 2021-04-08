import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import AreasController from '../controllers/AreasController';
import AreasPeloNomeController from '../controllers/AreasPeloNomeController';

const areaRouter = Router();
const areasController = new AreasController();
const areasPeloNomeController = new AreasPeloNomeController();

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

areaRouter.get('/nomes', areasPeloNomeController.index);

export default areaRouter;
