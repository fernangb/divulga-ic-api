import TokenUsuario from '../infra/typeorm/entities/TokenUsuario';

export default interface ITokensUsuarioRepository {
  gerarToken(id_usuario: string): Promise<TokenUsuario>;
}
