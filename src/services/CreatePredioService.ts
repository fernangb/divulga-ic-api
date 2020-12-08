import Predio from '../models/Predio';
import PrediosRepository from '../repositories/PrediosRepository';
import {getCustomRepository} from 'typeorm';

interface PredioDTO {
  nome: string;
  nome_comum: string;
  endereco: string;
  id_campus: string;
}

class CreatePredioService {
  public async execute({nome, nome_comum, endereco, id_campus}: PredioDTO): Promise<Predio>{
    const prediosRepository = getCustomRepository(PrediosRepository);

    const predioEncontrado = await prediosRepository.procurarPeloNome(nome);

    if(predioEncontrado){
      throw new Error('Prédio já cadastrado no sistema.');
    }

    const predio = prediosRepository.create({nome, nome_comum, endereco, id_campus});

    await prediosRepository.save(predio);

    return predio;
  }
}

export default CreatePredioService;
