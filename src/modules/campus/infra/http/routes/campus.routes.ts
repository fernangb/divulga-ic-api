import { Router } from 'express';
import CreateCampusService from '@modules/campus/services/CreateCampusService';
import { container } from 'tsyringe';

const campusRouter = Router();

campusRouter.post('/', async (request, response) => {
  const { nome, nome_comum, endereco } = request.body;

  const createCampus = container.resolve(CreateCampusService);

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
