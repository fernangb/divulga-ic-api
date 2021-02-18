import { getCustomRepository } from 'typeorm';
import Nivel from '@modules/usuarios/infra/typeorm/entities/Nivel';
import NiveisRepository from '@modules/usuarios/repositories/NiveisRepository';
import AppError from '@shared/errors/AppError';

interface NivelDTO {
  nome: string;
}

class CreateNivelService {
  public async execute({ nome }: NivelDTO): Promise<Nivel> {
    const niveisRepository = getCustomRepository(NiveisRepository);

    const nivelEncontrado = await niveisRepository.procurarPeloNome(nome);

    if (nivelEncontrado) {
      throw new AppError('Nível já cadastrado no sistema.');
    }

    const nivel = niveisRepository.create({ nome });

    await niveisRepository.save(nivel);

    return nivel;
  }
}

export default CreateNivelService;