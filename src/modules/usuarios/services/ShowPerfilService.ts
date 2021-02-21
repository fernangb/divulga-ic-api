import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Usuario from '../infra/typeorm/entities/Usuario';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

interface IRequest {
  id_usuario: string;
}

@injectable()
class ShowPerfilService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({ id_usuario }: IRequest): Promise<Usuario> {
    const usuario = await this.usuariosRepository.encontrarPeloId(id_usuario);

    if (!usuario) {
      throw new AppError('Usuário não encontrado');
    }

    return usuario;
  }
}

export default ShowPerfilService;
