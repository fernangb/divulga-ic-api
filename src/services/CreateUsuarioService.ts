import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Usuario from '../models/Usuario';

interface Request {
  email: string;
  senha: string;
  id_nivel: string;
}

class CreateUsuarioService {
  public async execute({ email, senha, id_nivel }: Request): Promise<Usuario> {
    const usersRepository = getRepository(Usuario);

    const checkUsuarioExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUsuarioExists) {
      throw new Error('Email já cadastrado.');
    }

    const hashedPassword = await hash(senha, 8);

    const user = usersRepository.create({
      email,
      senha: hashedPassword,
      id_nivel,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUsuarioService;