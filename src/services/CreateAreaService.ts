import { getCustomRepository } from 'typeorm';
import Area from '../models/Area';
import AreasRepository from '../repositories/AreasRepository';
import AppError from '../errors/AppError';

interface AreaDTO {
  nome: string;
}

class CreateAreaService {
  public async execute({ nome }: AreaDTO): Promise<Area> {
    const areasRepository = getCustomRepository(AreasRepository);

    const areaEncontrada = await areasRepository.procurarPeloNome(nome);

    if (areaEncontrada) {
      throw new AppError('Área já cadastrada no sistema.');
    }

    const area = areasRepository.create({ nome });

    await areasRepository.save(area);

    return area;
  }
}

export default CreateAreaService;
