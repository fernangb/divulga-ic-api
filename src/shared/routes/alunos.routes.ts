import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateAlunoService from '../../modules/alunos/services/CreateAlunoService';

const alunoRouter = Router();

alunoRouter.post('/', async (request, response) => {
  const { nome, id_curso, email, senha, dre } = request.body;

  const createAluno = new CreateAlunoService();

  const aluno = await createAluno.execute({
    nome,
    id_curso,
    email,
    senha,
    dre,
  });

  const alunoResponse = {
    nome,
    id_curso,
    email,
    dre,
  };

  return response.json(alunoResponse);
});

export default alunoRouter;
