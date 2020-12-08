import {Router} from 'express';
import CursosRepository from '../repositories/CursosRepository';
import CreateCursoService from '../services/CreateCursoService';
import {getCustomRepository} from 'typeorm';

const cursosRouter = Router();

cursosRouter.post('/', async (request, response) => {
  try{
    const {nome, id_predio, endereco, tipo, turno} = request.body;

    const createCurso = new CreateCursoService();

    const curso = await createCurso.execute({
      nome,
      id_predio,
      endereco,
      tipo,
      turno
    });

    return response.json(curso);
  }catch(err){
    return response.status(400).json({error: err.message});
  }
});

cursosRouter.get('/', async(request, response) => {
  const cursosRepository = getCustomRepository(CursosRepository);

  const cursos = await cursosRepository.find();

  return response.json(cursos);
});

export default cursosRouter;
