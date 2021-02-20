import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import { v4 as uuid_v4 } from 'uuid';
import TokenUsuario from '@modules/usuarios/infra/typeorm/entities/TokenUsuario';
import ITokensUsuarioRepository from '../ITokensUsuarioRepository';

class FakeTokensUsuarioRepository implements ITokensUsuarioRepository {
  private tokensUsuario: TokenUsuario[] = [];

  public async gerarToken(id_usuario: string): Promise<TokenUsuario> {
    const tokenUsuario = new TokenUsuario();

    Object.assign(tokenUsuario, {
      id: uuid_v4(),
      token: uuid_v4(),
      id_usuario,
    });

    this.tokensUsuario.push(tokenUsuario);

    return tokenUsuario;
  }

  public async encontrarPeloToken(
    token: string,
  ): Promise<TokenUsuario | undefined> {
    const tokenUsuario = this.tokensUsuario.find(
      tokenEncontrado => tokenEncontrado.token === token,
    );

    return tokenUsuario;
  }
}

export default FakeTokensUsuarioRepository;
