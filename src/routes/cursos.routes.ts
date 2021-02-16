import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CursosRepository from '../repositories/CursosRepository';
import CreateCursoService from '../services/CreateCursoService';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

const cursosRouter = Router();

cursosRouter.use(ensureAuthenticated);

cursosRouter.post('/', async (request, response) => {
  try {
    const { nome, id_predio, endereco, tipo, turno } = request.body;

    const createCurso = new CreateCursoService();

    const curso = await createCurso.execute({
      nome,
      id_predio,
      endereco,
      tipo,
      turno,
    });

    return response.json(curso);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

cursosRouter.get('/', async (request, response) => {
  const cursosRepository = getCustomRepository(CursosRepository);

  const cursos = await cursosRepository.find();

  return response.json(cursos);
});

export default cursosRouter;
