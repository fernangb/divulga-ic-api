import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICursosRepository from '../repositories/ICursosRepository';

interface CursoDTO {
  nome: string;
  predioId: string;
  endereco: string;
  nrPeriodos: number;
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
    predioId,
    endereco,
    tipo,
    turno,
    nrPeriodos,
  }: CursoDTO): Promise<Curso> {
    const cursoEncontrado = await this.cursosRepository.encontrarCursoExistente(
      nome,
      tipo,
      turno,
    );

    if (cursoEncontrado) {
      throw new AppError('Curso já cadastrado no sistema.');
    }

    const curso = await this.cursosRepository.create({
      nome,
      predioId,
      endereco,
      tipo,
      turno,
      nrPeriodos,
    });

    return curso;
  }
}

export default CreateCursoService;
