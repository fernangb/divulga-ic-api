import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Nivel from '../infra/typeorm/entities/Nivel';
import INiveisRepository from '../repositories/INiveisRepository';

interface IRequest {
  nome: string;
}

@injectable()
class ListNivelPorNomeService {
  constructor(
    @inject('NiveisRepository')
    private niveisRepository: INiveisRepository,
  ) {}

  public async execute({ nome }: IRequest): Promise<Nivel | undefined> {
    const nivel = await this.niveisRepository.encontrarPeloNome(nome);

    if (!nivel) {
      throw new AppError('Nível não encontrado.');
    }

    return this.niveisRepository.encontrarPeloNome(nome);
  }
}

export default ListNivelPorNomeService;
