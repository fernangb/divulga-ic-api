import Aluno from '../models/Aluno';
import {getCustomRepository, getRepository} from 'typeorm';

interface AlunoDTO {
  nome: string;
  email: string;
  senha: string;
  id_curso: string;
  dre: string;
}

class CreateAlunoService {
  public async execute({nome, email, senha, id_curso, dre}: AlunoDTO): Promise<Aluno>{
    const alunosRepository = getRepository(Aluno);

    const alunoEncontrado = await alunosRepository.findOne({
      where: {email}
    });

    if(alunoEncontrado){
      throw new Error('Email já cadastrado no sistema.');
    }

    const aluno = alunosRepository.create({nome, id_curso, email, senha, dre});

    await alunosRepository.save(aluno);

    return aluno;
  }
}

export default CreateAlunoService;
