import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Usuario from '../infra/typeorm/entities/Usuario';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

interface IRequest {
  usuarioId: string;
  nome: string;
  email: string;
  senha?: string;
  senha_antiga?: string;
}

@injectable()
class UpdatePerfilService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    usuarioId,
    nome,
    email,
    senha,
    senha_antiga,
  }: IRequest): Promise<Usuario | undefined> {
    const usuario = await this.usuariosRepository.encontrarPeloId(usuarioId);

    if (!usuario) {
      throw new AppError('Usuário não encontrado');
    }

    const usuarioComEmailAtualizado = await this.usuariosRepository.encontrarPeloEmail(
      email,
    );

    if (
      usuarioComEmailAtualizado &&
      usuarioComEmailAtualizado.id !== usuarioId
    ) {
      throw new AppError('Email já cadastrado no sistema');
    }

    usuario.nome = nome;
    usuario.email = email;

    if (senha && !senha_antiga) {
      throw new AppError(
        'Você precisa informar a senha antiga para atualizá-la',
      );
    }

    if (senha && senha_antiga) {
      const verificarSenhaAntiga = await this.hashProvider.compararHash(
        senha_antiga,
        usuario.senha,
      );

      if (!verificarSenhaAntiga) {
        throw new AppError('Senha antiga inválida');
      }

      usuario.senha = await this.hashProvider.gerarHash(senha);
    }

    return this.usuariosRepository.save(usuario);
  }
}

export default UpdatePerfilService;
