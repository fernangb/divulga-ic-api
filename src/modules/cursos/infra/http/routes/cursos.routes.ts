import { Router } from 'express';
import CreateCursoService from '@modules/cursos/services/CreateCursoService';
// import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import { container } from 'tsyringe';

const cursosRouter = Router();

// cursosRouter.use(ensureAuthenticated);

cursosRouter.post('/', async (request, response) => {
  const { nome, id_predio, endereco, tipo, turno } = request.body;

  const createCurso = container.resolve(CreateCursoService);

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
