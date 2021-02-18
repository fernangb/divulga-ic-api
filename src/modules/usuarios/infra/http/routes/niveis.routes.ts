import { Router } from 'express';
import CreateNivelService from '@modules/usuarios/services/CreateNivelService';
import { container } from 'tsyringe';

const nivelRouter = Router();

nivelRouter.post('/', async (request, response) => {
  const { nome } = request.body;

  const createNivel = container.resolve(CreateNivelService);

  const nivel = await createNivel.execute({
    nome,
  });

  return response.json(nivel);
});

// nivelRouter.get('/', async (request, response) => {

//   const nivel = await nivelRepository.find();

//   return response.json(nivel);
// });

export default nivelRouter;
