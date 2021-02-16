/* eslint-disable class-methods-use-this */
import { getCustomRepository, getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Aluno from '../models/Aluno';

interface AlunoDTO {
  nome: string;
  email: string;
  senha: string;
  id_curso: string;
  dre: string;
}

class CreateAlunoService {
  public async execute({
    nome,
    email,
    senha,
    id_curso,
    dre,
  }: AlunoDTO): Promise<Aluno> {
    const alunosRepository = getRepository(Aluno);

    const alunoEncontrado = await alunosRepository.findOne({
      where: { email },
    });

    if (alunoEncontrado) {
      throw new Error('Email já cadastrado no sistema.');
    }

    const senhaCriptografada = await hash(senha, 8);

    const aluno = alunosRepository.create({
      nome,
      id_curso,
      email,
      senha: senhaCriptografada,
      dre,
    });

    await alunosRepository.save(aluno);

    return aluno;
  }
}

export default CreateAlunoService;
