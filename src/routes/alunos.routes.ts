import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateAlunoService from '../services/CreateAlunoService';

const alunoRouter = Router();

alunoRouter.post('/', async (request, response) => {
  try {
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
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default alunoRouter;
