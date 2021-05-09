import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Usuario from '../infra/typeorm/entities/Usuario';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

interface IRequest {
  usuarioId: string;
  nome: string;
  sobrenome: string;
  email: string;
}

@injectable()
class UpdateUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({
    usuarioId,
    nome,
    sobrenome,
    email,
  }: IRequest): Promise<Usuario | undefined> {
    const usuario = await this.usuariosRepository.encontrarPeloId(usuarioId);

    if (!usuario) {
      throw new AppError('Usuário não encontrado.');
    }

    const usuarioComEmailAtualizado = await this.usuariosRepository.encontrarPeloEmail(
      email,
    );

    if (
      usuarioComEmailAtualizado &&
      usuarioComEmailAtualizado.id !== usuarioId
    ) {
      throw new AppError('Email já cadastrado no sistema.');
    }

    usuario.nome = nome;
    usuario.sobrenome = sobrenome;
    usuario.email = email;

    return this.usuariosRepository.save(usuario);
  }
}

export default UpdateUsuarioService;
