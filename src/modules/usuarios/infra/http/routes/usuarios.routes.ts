import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CreateUsuarioService from '@modules/usuarios/services/CreateUsuarioService';
import UpdateAvatarUsuarioService from '@modules/usuarios/services/UpdateAvatarUsuarioService';
import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';

const usuarioRouter = Router();
const upload = multer(uploadConfig);

usuarioRouter.post('/', async (request, response) => {
  const { email, senha, id_nivel } = request.body;

  const createUsuario = new CreateUsuarioService();

  const user = await createUsuario.execute({
    email,
    senha,
    id_nivel,
  });

  const usuarioResponse = {
    id_nivel,
    email,
  };

  return response.json(usuarioResponse);
});

usuarioRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateAvatarUsuario = new UpdateAvatarUsuarioService();

      const user = await updateAvatarUsuario.execute({
        id_usuario: request.usuario.id,
        avatarFilename: request.file.filename,
      });

      delete user.senha;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default usuarioRouter;
