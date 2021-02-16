/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import Aluno from '../models/Aluno';

interface Request {
  email: string;
  senha: string;
}

interface Response {
  aluno: Aluno;
}

class AuthenticateAlunoService {
  public async execute({ email, senha }: Request): Promise<Response> {
    const alunosRepository = getRepository(Aluno);

    const aluno = alunosRepository.findOne({ where: { email } });

    if (!aluno) {
      throw new Error('Email ou senha invalido.');
    }

    const senhaCorreta = await compare(senha, aluno.senha);

    if (!senhaCorreta) {
      throw new Error('Email ou senha invalido.');
    }

    return { aluno };
  }
}

export default AuthenticateAlunoService;
