/* eslint-disable import/no-extraneous-dependencies */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import ITokensUsuarioRepository from '../repositories/ITokensUsuarioRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

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

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, senha }: IRequest): Promise<void> {
    const tokenUsuario = await this.tokensUsuarioRepository.encontrarPeloToken(
      token,
    );

    if (!tokenUsuario) {
      throw new AppError('Token do usuário não existe.');
    }
    const usuario = await this.usuariosRepository.encontrarPeloId(
      tokenUsuario.usuarioId,
    );

    if (!usuario) {
      throw new AppError('Usuário não existe.');
    }

    const dtCriacaoToken = tokenUsuario.dtCriacao;
    const dataLimite = addHours(dtCriacaoToken, 2);

    if (isAfter(Date.now(), dataLimite)) {
      throw new AppError('Token expirado');
    }

    usuario.senha = await this.hashProvider.gerarHash(senha);

    this.usuariosRepository.save(usuario);
  }
}

export default ResetarSenhaService;
