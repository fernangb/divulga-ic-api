import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

@injectable()
class CreateUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const usuarioEncontrado = await this.usuariosRepository.encontrarPeloId(id);

    if (!usuarioEncontrado) {
      throw new AppError('Usuário não encontrado.');
    }

    await this.usuariosRepository.delete(id);
  }
}

export default CreateUsuarioService;
