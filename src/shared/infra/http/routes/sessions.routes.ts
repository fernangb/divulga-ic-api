import { Router } from 'express';
import AuthenticateUsuarioService from '../../../../modules/usuarios/services/AuthenticateUsuarioService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usuarioAutenticado = new AuthenticateUsuarioService();

  const { user, token } = await usuarioAutenticado.execute({
    email,
    senha: password,
  });

  delete user.senha;

  return response.json({ user, token });
});

export default sessionsRouter;
