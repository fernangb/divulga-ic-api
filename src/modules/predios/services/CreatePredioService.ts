import Predio from '@modules/predios/infra/typeorm/entities/Predio';
import AppError from '@shared/errors/AppError';
import IPrediosRepository from '../repositories/IPrediosRepository';

interface IRequest {
  nome: string;
  nome_comum: string;
  endereco: string;
  id_campus: string;
}

class CreatePredioService {
  constructor(private prediosRepository: IPrediosRepository) {}

  public async execute({
    nome,
    nome_comum,
    endereco,
    id_campus,
  }: IRequest): Promise<Predio> {
    const predioEncontrado = await this.prediosRepository.procurarPeloNome(
      nome,
    );

    if (predioEncontrado) {
      throw new AppError('Prédio já cadastrado no sistema.');
    }

    const predio = await this.prediosRepository.create({
      nome,
      nome_comum,
      endereco,
      id_campus,
    });

    return predio;
  }
}

export default CreatePredioService;
