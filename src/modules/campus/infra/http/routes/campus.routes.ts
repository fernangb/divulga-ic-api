import { Router } from 'express';
import CampusController from '../controllers/CampusController';

const campusRouter = Router();
const campusController = new CampusController();

campusRouter.post('/', campusController.create);

// campusRouter.get('/', async (request, response) => {
//   const campusRepository = getCustomRepository(CampusRepository);

//   const campus = await campusRepository.find();

//   return response.json(campus);
// });

export default campusRouter;
