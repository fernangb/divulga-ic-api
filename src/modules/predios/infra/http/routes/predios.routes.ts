import { Router } from 'express';
import PrediosRepository from '@modules/predios/infra/typeorm/repositories/PrediosRepository';
import CreatePredioService from '@modules/predios/services/CreatePredioService';

const predioRouter = Router();

predioRouter.post('/', async (request, response) => {
  const { nome, nome_comum, endereco, id_campus } = request.body;

  const prediosRepository = new PrediosRepository();

  const createPredio = new CreatePredioService(prediosRepository);

  const predio = await createPredio.execute({
    nome,
    nome_comum,
    endereco,
    id_campus,
  });

  return response.json(predio);
});

// predioRouter.get('/', async (request, response) => {

//   const predio = await predioRepository.find();

//   return response.json(predio);
// });

export default predioRouter;
