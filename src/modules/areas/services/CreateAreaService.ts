import Area from '@modules/areas/infra/typeorm/entities/Area';
import AppError from '@shared/errors/AppError';
import IAreasRepository from '../repositories/IAreasRepository';

interface IRequest {
  nome: string;
}

class CreateAreaService {
  constructor(private areasRepository: IAreasRepository) {}

  public async execute({ nome }: IRequest): Promise<Area> {
    const areaEncontrada = await this.areasRepository.procurarPeloNome(nome);

    if (areaEncontrada) {
      throw new AppError('Área já cadastrada no sistema.');
    }

    const area = await this.areasRepository.create({ nome });

    return area;
  }
}

export default CreateAreaService;
