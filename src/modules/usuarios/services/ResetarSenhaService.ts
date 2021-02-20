import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import ITokensUsuarioRepository from '../repositories/ITokensUsuarioRepository';

interface IRequest {
  senha: string;
  token: string;
}

@injectable()
class ResetarSenhaService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,

    @inject('TokensUsuarioRepository')
    private tokensUsuarioRepository: ITokensUsuarioRepository,
  ) {}

  public async execute({ token, senha }: IRequest): Promise<void> {
    const tokenUsuario = await this.tokensUsuarioRepository.encontrarPeloToken(
      token,
    );

    if (!tokenUsuario) {
      throw new AppError('Token do usuário não existe.');
    }
    const usuario = await this.usuariosRepository.encontrarPeloId(
      tokenUsuario.id_usuario,
    );

    if (!usuario) {
      throw new AppError('Usuário não existe.');
    }

    usuario.senha = senha;

    this.usuariosRepository.save(usuario);
  }
}

export default ResetarSenhaService;
