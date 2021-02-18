import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import Usuario from '../entities/Usuario';
import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';

interface Request {
  email: string;
  senha: string;
}

interface Response {
  user: Usuario;
  token: string;
}

class AuthenticateUsuarioService {
  public async execute({ email, senha }: Request): Promise<Response> {
    const usuariosRepository = getRepository(Usuario);

    const user = await usuariosRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Combinação email/senha incorreta.', 401);
    }

    const senhaCorreta = await compare(senha, user.senha);

    if (!senhaCorreta) {
      throw new AppError('Combinação email/senha incorreta.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUsuarioService;
