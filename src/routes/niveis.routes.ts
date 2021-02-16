import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import NiveisRepository from '../repositories/NiveisRepository';
import CreateNivelService from '../services/CreateNivelService';

const nivelRouter = Router();

nivelRouter.post('/', async (request, response) => {
  try {
    const { nome } = request.body;

    const createNivel = new CreateNivelService();

    const nivel = await createNivel.execute({
      nome,
    });

    return response.json(nivel);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

nivelRouter.get('/', async (request, response) => {
  const nivelRepository = getCustomRepository(NiveisRepository);

  const nivel = await nivelRepository.find();

  return response.json(nivel);
});

export default nivelRouter;
