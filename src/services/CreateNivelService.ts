import { getCustomRepository } from 'typeorm';
import Nivel from '../models/Nivel';
import NiveisRepository from '../repositories/NiveisRepository';

interface NivelDTO {
  nome: string;
}

class CreateNivelService {
  public async execute({ nome }: NivelDTO): Promise<Nivel> {
    const niveisRepository = getCustomRepository(NiveisRepository);

    const nivelEncontrado = await niveisRepository.procurarPeloNome(nome);

    if (nivelEncontrado) {
      throw new Error('Nível já cadastrado no sistema.');
    }

    const nivel = niveisRepository.create({ nome });

    await niveisRepository.save(nivel);

    return nivel;
  }
}

export default CreateNivelService;
