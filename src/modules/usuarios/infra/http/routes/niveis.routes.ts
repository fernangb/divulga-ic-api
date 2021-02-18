import { Router } from 'express';
import NiveisRepository from '@modules/usuarios/infra/typeorm/repositories/NiveisRepository';
import CreateNivelService from '@modules/usuarios/services/CreateNivelService';

const nivelRouter = Router();
const niveisRepository = new NiveisRepository();

nivelRouter.post('/', async (request, response) => {
  const { nome } = request.body;

  const createNivel = new CreateNivelService(niveisRepository);

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
