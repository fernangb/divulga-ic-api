import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/usuarios/infra/http/middlewares/EnsureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import UsuariosController from '../controllers/UsuariosController';
import AvatarUsuariosController from '../controllers/AvatarUsuariosController';

const usuarioRouter = Router();
const upload = multer(uploadConfig);

const usuariosController = new UsuariosController();
const avatarUsuariosController = new AvatarUsuariosController();

usuarioRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      nome: Joi.string().required(),
      nivel: Joi.string().required(),
    },
  }),
  usuariosController.create,
);

usuarioRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  avatarUsuariosController.update,
);

usuarioRouter.delete('/:id', usuariosController.delete);

export default usuarioRouter;
