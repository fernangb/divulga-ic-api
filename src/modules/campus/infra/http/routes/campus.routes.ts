import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CampusController from '../controllers/CampusController';

const campusRouter = Router();
const campusController = new CampusController();

campusRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      nome_comum: Joi.string().required(),
      endereco: Joi.string().required(),
    },
  }),
  campusController.create,
);

export default campusRouter;
