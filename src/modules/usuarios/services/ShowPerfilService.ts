import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Usuario from '../infra/typeorm/entities/Usuario';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

interface IRequest {
  usuarioId: string;
}

@injectable()
class ShowPerfilService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({ usuarioId }: IRequest): Promise<Usuario> {
    const usuario = await this.usuariosRepository.encontrarPeloId(usuarioId);

    if (!usuario) {
      throw new AppError('Usuário não encontrado');
    }

    return usuario;
  }
}

export default ShowPerfilService;
