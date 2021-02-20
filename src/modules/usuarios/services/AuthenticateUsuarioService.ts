import { sign } from 'jsonwebtoken';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  user: Usuario;
  token: string;
}

@injectable()
class AuthenticateUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, senha }: IRequest): Promise<IResponse> {
    const user = await this.usuariosRepository.procurarPeloEmail(email);

    if (!user) {
      throw new AppError('Combinação email/senha incorreta.', 401);
    }

    const senhaCorreta = await this.hashProvider.compararHash(
      senha,
      user.senha,
    );

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
