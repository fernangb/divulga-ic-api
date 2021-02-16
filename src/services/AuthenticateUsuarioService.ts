import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import Usuario from '../models/Usuario';

interface Request {
  email: string;
  senha: string;
}

interface Response {
  usuario: Usuario;
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

    return { usuario };
  }
}

export default AuthenticateUsuarioService;
