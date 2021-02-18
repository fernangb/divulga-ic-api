import Nivel from '@modules/usuarios/infra/typeorm/entities/Nivel';
import AppError from '@shared/errors/AppError';
import INiveisRepository from '../repositories/INiveisRepository';

interface IRequest {
  nome: string;
}

class CreateNivelService {
  constructor(private niveisRepository: INiveisRepository) {}

  public async execute({ nome }: IRequest): Promise<Nivel> {
    const nivelEncontrado = await this.niveisRepository.procurarPeloNome(nome);

    if (nivelEncontrado) {
      throw new AppError('Nível já cadastrado no sistema.');
    }

    const nivel = await this.niveisRepository.create({ nome });

    return nivel;
  }
}

export default CreateNivelService;
