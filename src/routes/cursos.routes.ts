import {Router} from 'express';
import Curso from '../models/Curso';

const cursosRouter = Router();

const cursos: Curso[] = [];

cursosRouter.post('/', (request, response) => {
  const {nome, predio, endereco} = request.body;

  const curso = new Curso(nome, predio, endereco);

  cursos.push(curso);

  return response.json(curso);
});

export default cursosRouter;
