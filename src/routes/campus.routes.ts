import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CampusRepository from '../repositories/CampusRepository';
import CreateCampusService from '../services/CreateCampusService';

const campusRouter = Router();

campusRouter.post('/', async (request, response) => {
  try {
    const { nome, nome_comum, endereco } = request.body;

    const createCampus = new CreateCampusService();

    const campus = await createCampus.execute({
      nome,
      endereco,
      nome_comum,
    });

    return response.json(campus);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

campusRouter.get('/', async (request, response) => {
  const campusRepository = getCustomRepository(CampusRepository);

  const campus = await campusRepository.find();

  return response.json(campus);
});

export default campusRouter;
