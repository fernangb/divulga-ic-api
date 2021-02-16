import { getCustomRepository } from 'typeorm';
import Curso from '../models/Curso';
import CursosRepository from '../repositories/CursosRepository';
import AppError from '../errors/AppError';

interface CursoDTO {
  nome: string;
  id_predio: string;
  endereco: string;
  tipo: 'Bacharel' | 'Licenciatura';
  turno: 'Integral' | 'Noturno';
}

class CreateCursoService {
  public async execute({
    nome,
    id_predio,
    endereco,
    tipo,
    turno,
  }: CursoDTO): Promise<Curso> {
    const cursosRepository = getCustomRepository(CursosRepository);

    const cursoEncontrado = await cursosRepository.procurarCursoExistente(
      nome,
      tipo,
      turno,
    );

    if (cursoEncontrado) {
      throw new AppError('Curso já cadastrado no sistema.');
    }

    const curso = cursosRepository.create({
      nome,
      id_predio,
      endereco,
      tipo,
      turno,
    });

    await cursosRepository.save(curso);

    return curso;
  }
}

export default CreateCursoService;
