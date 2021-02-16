import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import Usuario from '../models/Usuario';
import authConfig from '../config/auth';

interface Request {
  email: string;
  senha: string;
}

interface Response {
  usuario: Usuario;
  token: string;
}

class AuthenticateUsuarioService {
  public async execute({ email, senha }: Request): Promise<Response> {
    const usuariosRepository = getRepository(Usuario);

    const usuario = await usuariosRepository.findOne({
      where: { email },
    });

    if (!usuario) {
      throw new Error('Combinação email/senha incorreta.');
    }

    const senhaCorreta = await compare(senha, usuario.senha);

    if (!senhaCorreta) {
      throw new Error('Combinação email/senha incorreta.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: usuario.id,
      expiresIn,
    });

    return { usuario, token };
  }
}

export default AuthenticateUsuarioService;
