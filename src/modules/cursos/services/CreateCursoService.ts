import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICursosRepository from '../repositories/ICursosRepository';

interface CursoDTO {
  nome: string;
  id_predio: string;
  endereco: string;
  nr_periodos: number;
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
    nr_periodos,
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
      id_predio,
      endereco,
      tipo,
      turno,
      nr_periodos,
    });

    return curso;
  }
}

export default CreateCursoService;
