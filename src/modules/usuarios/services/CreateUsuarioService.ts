import { hash } from 'bcryptjs';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

interface IRequest {
  email: string;
  senha: string;
  id_nivel: string;
}

@injectable()
class CreateUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({ email, senha, id_nivel }: IRequest): Promise<Usuario> {
    const usuarioEncontrado = await this.usuariosRepository.procurarPeloEmail(
      email,
    );

    if (usuarioEncontrado) {
      throw new AppError('Email já cadastrado.');
    }

    const hashedPassword = await hash(senha, 8);

    const user = await this.usuariosRepository.create({
      email,
      senha: hashedPassword,
      id_nivel,
    });

    return user;
  }
}

export default CreateUsuarioService;
