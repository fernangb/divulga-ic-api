import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import UsuariosController from '../controllers/UsuariosController';
import AvatarUsuariosController from '../controllers/AvatarUsuariosController';

const usuarioRouter = Router();
const upload = multer(uploadConfig);

const usuariosController = new UsuariosController();
const avatarUsuariosController = new AvatarUsuariosController();

usuarioRouter.post('/', usuariosController.create);
usuarioRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  avatarUsuariosController.update,
);

export default usuarioRouter;
