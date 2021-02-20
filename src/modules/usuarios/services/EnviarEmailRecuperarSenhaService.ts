import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import ITokensUsuarioRepository from '../repositories/ITokensUsuarioRepository';

interface IRequest {
  email: string;
}

@injectable()
class EnviarEmailRecuperarSenhaService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('TokensUsuarioRepository')
    private tokensUsuarioRepository: ITokensUsuarioRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const usuario = await this.usuariosRepository.procurarPeloEmail(email);

    if (!usuario) {
      throw new AppError('Usuário não existe.');
    }

    await this.tokensUsuarioRepository.gerarToken(usuario.id);

    this.mailProvider.enviarEmail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}

export default EnviarEmailRecuperarSenhaService;
