import { getCustomRepository } from 'typeorm';
import Predio from '../infra/typeorm/entities/Predio';
import PrediosRepository from '../repositories/PrediosRepository';
import AppError from '../../../shared/errors/AppError';

interface PredioDTO {
  nome: string;
  nome_comum: string;
  endereco: string;
  id_campus: string;
}

class CreatePredioService {
  public async execute({
    nome,
    nome_comum,
    endereco,
    id_campus,
  }: PredioDTO): Promise<Predio> {
    const prediosRepository = getCustomRepository(PrediosRepository);

    const predioEncontrado = await prediosRepository.procurarPeloNome(nome);

    if (predioEncontrado) {
      throw new AppError('Prédio já cadastrado no sistema.');
    }

    const predio = prediosRepository.create({
      nome,
      nome_comum,
      endereco,
      id_campus,
    });

    await prediosRepository.save(predio);

    return predio;
  }
}

export default CreatePredioService;
