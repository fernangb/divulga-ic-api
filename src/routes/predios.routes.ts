import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import PrediosRepository from '../repositories/PrediosRepository';
import CreatePredioService from '../services/CreatePredioService';

const predioRouter = Router();

predioRouter.post('/', async (request, response) => {
  const { nome, nome_comum, endereco, id_campus } = request.body;

  const createPredio = new CreatePredioService();

  const predio = await createPredio.execute({
    nome,
    nome_comum,
    endereco,
    id_campus,
  });

  return response.json(predio);
});

predioRouter.get('/', async (request, response) => {
  const predioRepository = getCustomRepository(PrediosRepository);

  const predio = await predioRepository.find();

  return response.json(predio);
});

export default predioRouter;
