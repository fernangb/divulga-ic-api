import { Router } from 'express';
import AuthenticateUsuarioService from '../services/AuthenticateUsuarioService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, senha } = request.body;

  const usuarioAutenticado = new AuthenticateUsuarioService();

  const { usuario, token } = await usuarioAutenticado.execute({
    email,
    senha,
  });

  delete usuario.senha;

  return response.json({ usuario, token });
});

export default sessionsRouter;
