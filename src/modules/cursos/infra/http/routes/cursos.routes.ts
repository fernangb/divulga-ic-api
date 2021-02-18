import { Router } from 'express';
import CursosRepository from '@modules/cursos/infra/typeorm/repositories/CursosRepository';
import CreateCursoService from '@modules/cursos/services/CreateCursoService';
// import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';

const cursosRouter = Router();

// cursosRouter.use(ensureAuthenticated);

cursosRouter.post('/', async (request, response) => {
  const { nome, id_predio, endereco, tipo, turno } = request.body;

  const cursosRepository = new CursosRepository();

  const createCurso = new CreateCursoService(cursosRepository);

  const curso = await createCurso.execute({
    nome,
    id_predio,
    endereco,
    tipo,
    turno,
  });

  return response.json(curso);
});

// cursosRouter.get('/', async (request, response) => {

//   const cursos = await cursosRepository.find();

//   return response.json(cursos);
// });

export default cursosRouter;
