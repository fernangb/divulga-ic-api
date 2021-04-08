import  INiveisRepository  from '@modules/usuarios/repositories/INiveisRepository';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  confirmacaoSenha: string;
  nivel: string;
}

@injectable()
class CreateUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
    @inject('NiveisRepository')
    private niveisRepository: INiveisRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    senha,
    nivel,
    nome,
    sobrenome,
    confirmacaoSenha
  }: IRequest): Promise<Usuario> {
    const usuarioEncontrado = await this.usuariosRepository.encontrarPeloEmail(
      email,
    );

    if (usuarioEncontrado) {
      throw new AppError('Email já cadastrado.');
    }

    const nivelUsuario = await this.niveisRepository.encontrarPeloNome(nivel);

    if(!nivelUsuario){
      throw new AppError('Nível inválido.');
    }

    if(senha !== confirmacaoSenha){
      throw new AppError('Confirmação de senha inválida. As senhas não são as mesmas.');
    }

    const hashedPassword = await this.hashProvider.gerarHash(senha);

    const user = await this.usuariosRepository.create({
      nome,
      sobrenome,
      email,
      senha: hashedPassword,
      nivelId: nivelUsuario.id,
    });

    return user;
  }
}

export default CreateUsuarioService;
