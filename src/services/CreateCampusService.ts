import Campus from '../models/Campus';
import CampusRepository from '../repositories/CampusRepository';
import {getCustomRepository} from 'typeorm';

interface CampusDTO {
  nome: string;
  endereco:  string;
  nome_comum: string;
}

class CreateCampusService {
  public async execute({nome,endereco, nome_comum}: CampusDTO): Promise<Campus>{
    const campusRepository = getCustomRepository(CampusRepository);

    const campusEncontrado = await campusRepository.procurarPeloNome(nome);

    if(campusEncontrado){
      throw new Error('Campus já cadastrado no sistema.');
    }

    const campus = campusRepository.create({nome,endereco, nome_comum});

    await campusRepository.save(campus);

    return campus;
  }
}

export default CreateCampusService;
