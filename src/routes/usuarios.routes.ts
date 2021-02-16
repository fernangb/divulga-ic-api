import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUsuarioService from '../services/CreateUsuarioService';
import UpdateAvatarUsuarioService from '../services/UpdateAvatarUsuarioService';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

const usuarioRouter = Router();
const upload = multer(uploadConfig);

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

usuarioRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateAvatarUsuario = new UpdateAvatarUsuarioService();

      const usuario = await updateAvatarUsuario.execute({
        id_usuario: request.usuario.id,
        avatarFilename: request.file.filename,
      });

      delete usuario.senha;

      return response.json(usuario);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default usuarioRouter;
