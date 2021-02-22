import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import { inject, injectable } from 'tsyringe';
import ICursosRepository from '../repositories/ICursosRepository';

@injectable()
class ListCursosService {
  constructor(
    @inject('CursosRepository')
    private cursosRepository: ICursosRepository,
  ) {}

  public async execute(): Promise<Curso[]> {
    const cursos = await this.cursosRepository.list();

    return this.cursosRepository.ordenar(cursos);
  }
}

export default ListCursosService;
