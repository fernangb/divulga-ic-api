import { Router } from 'express';
import CampusRepository from '@modules/campus/infra/typeorm/repositories/CampusRepository';
import CreateCampusService from '@modules/campus/services/CreateCampusService';

const campusRouter = Router();

campusRouter.post('/', async (request, response) => {
  const { nome, nome_comum, endereco } = request.body;

  const campusRepository = new CampusRepository();

  const createCampus = new CreateCampusService(campusRepository);

  const campus = await createCampus.execute({
    nome,
    endereco,
    nome_comum,
  });

  return response.json(campus);
});

// campusRouter.get('/', async (request, response) => {
//   const campusRepository = getCustomRepository(CampusRepository);

//   const campus = await campusRepository.find();

//   return response.json(campus);
// });

export default campusRouter;
