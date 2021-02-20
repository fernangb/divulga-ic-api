import { getRepository, Repository } from 'typeorm';
import ITokenUsuarioRepository from '@modules/usuarios/repositories/ITokensUsuarioRepository';
import TokenUsuario from '../entities/TokenUsuario';

class TokensUsuarioRepository implements ITokenUsuarioRepository {
  private ormRepository: Repository<TokenUsuario>;

  constructor() {
    this.ormRepository = getRepository(TokenUsuario);
  }

  public async encontrarPeloToken(
    token: string,
  ): Promise<TokenUsuario | undefined> {
    const tokenUsuario = await this.ormRepository.findOne({
      where: { token },
    });

    return tokenUsuario;
  }

  public async gerarToken(id_usuario: string): Promise<TokenUsuario> {
    const tokenUsuario = this.ormRepository.create({ id_usuario });

    await this.ormRepository.save(tokenUsuario);

    return tokenUsuario;
  }
}

export default TokensUsuarioRepository;
