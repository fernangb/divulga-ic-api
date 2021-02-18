import { Router } from 'express';
import CreatePredioService from '@modules/predios/services/CreatePredioService';
import { container } from 'tsyringe';

const predioRouter = Router();

predioRouter.post('/', async (request, response) => {
  const { nome, nome_comum, endereco, id_campus } = request.body;

  const createPredio = container.resolve(CreatePredioService);

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
