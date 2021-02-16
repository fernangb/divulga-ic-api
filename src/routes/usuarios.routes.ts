import { Router } from 'express';
import CreateUsuarioService from '../services/CreateUsuarioService';

const usuarioRouter = Router();

usuarioRouter.post('/', async (request, response) => {
  try {
    const { email, senha, id_nivel } = request.body;

    const createUsuario = new CreateUsuarioService();

    const usuario = await createUsuario.execute({
      email,
      senha,
      id_nivel,
    });

    const usuarioResponse = {
      id_nivel,
      email,
    };

    return response.json(usuarioResponse);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usuarioRouter;
