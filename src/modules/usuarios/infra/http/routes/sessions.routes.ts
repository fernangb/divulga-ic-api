import { Router } from 'express';
import AuthenticateUsuarioService from '@modules/usuarios/services/AuthenticateUsuarioService';
import UsuariosRepository from '../../typeorm/repositories/UsuariosRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usuariosRepository = new UsuariosRepository();

  const usuarioAutenticado = new AuthenticateUsuarioService(usuariosRepository);

  const { user, token } = await usuarioAutenticado.execute({
    email,
    senha: password,
  });

  delete user.senha;

  return response.json({ user, token });
});

export default sessionsRouter;
