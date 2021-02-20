import Nivel from '@modules/usuarios/infra/typeorm/entities/Nivel';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import INiveisRepository from '../repositories/INiveisRepository';

interface IRequest {
  nome: string;
}

@injectable()
class CreateNivelService {
  constructor(
    @inject('NiveisRepository')
    private niveisRepository: INiveisRepository,
  ) {}

  public async execute({ nome }: IRequest): Promise<Nivel> {
    const nivelEncontrado = await this.niveisRepository.encontrarPeloNome(nome);

    if (nivelEncontrado) {
      throw new AppError('Nível já cadastrado no sistema.');
    }

    const nivel = await this.niveisRepository.create({ nome });

    return nivel;
  }
}

export default CreateNivelService;
