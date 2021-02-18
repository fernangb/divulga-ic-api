import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICursosRepository from '../repositories/ICursosRepository';

interface CursoDTO {
  nome: string;
  id_predio: string;
  endereco: string;
  tipo: 'Bacharel' | 'Licenciatura';
  turno: 'Integral' | 'Noturno';
}

@injectable()
class CreateCursoService {
  constructor(
    @inject('CursosRepository')
    private cursosRepository: ICursosRepository,
  ) {}

  public async execute({
    nome,
    id_predio,
    endereco,
    tipo,
    turno,
  }: CursoDTO): Promise<Curso> {
    const cursoEncontrado = await this.cursosRepository.procurarCursoExistente(
      nome,
      tipo,
      turno,
    );

    if (cursoEncontrado) {
      throw new AppError('Curso já cadastrado no sistema.');
    }

    const curso = await this.cursosRepository.create({
      nome,
      id_predio,
      endereco,
      tipo,
      turno,
    });

    return curso;
  }
}

export default CreateCursoService;
