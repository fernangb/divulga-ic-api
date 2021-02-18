import { Router } from 'express';
import AuthenticateUsuarioService from '@modules/usuarios/services/AuthenticateUsuarioService';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usuarioAutenticado = container.resolve(AuthenticateUsuarioService);

  const { user, token } = await usuarioAutenticado.execute({
    email,
    senha: password,
  });

  delete user.senha;

  return response.json({ user, token });
});

export default sessionsRouter;
