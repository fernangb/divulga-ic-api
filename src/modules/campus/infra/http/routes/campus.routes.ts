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

// campusRouter.get('/', async (request, response) => {
//   const campusRepository = getCustomRepository(CampusRepository);

//   const campus = await campusRepository.find();

//   return response.json(campus);
// });

export default campusRouter;
