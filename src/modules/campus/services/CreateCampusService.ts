import { getCustomRepository } from 'typeorm';
import Campus from '@modules/campus/infra/typeorm/entities/Campus';
import CampusRepository from '@modules/campus/infra/typeorm/repositories/CampusRepository';
import AppError from '@shared/errors/AppError';

interface CampusDTO {
  nome: string;
  endereco: string;
  nome_comum: string;
}

class CreateCampusService {
  public async execute({
    nome,
    endereco,
    nome_comum,
  }: CampusDTO): Promise<Campus> {
    const campusRepository = getCustomRepository(CampusRepository);

    const campusEncontrado = await campusRepository.procurarPeloNome(nome);

    if (campusEncontrado) {
      throw new AppError('Campus já cadastrado no sistema.');
    }

    const campus = await campusRepository.create({
      nome,
      endereco,
      nome_comum,
    });

    return campus;
  }
}

export default CreateCampusService;
