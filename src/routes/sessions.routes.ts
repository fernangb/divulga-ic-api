import { Router } from 'express';
import AuthenticateAlunoService from '../services/AuthenticateAlunoService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, senha } = request.body;

    const usuarioAutenticado = new AuthenticateAlunoService();

    await usuarioAutenticado.execute({ email, senha });

    return response.json({ ok: true });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
