import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import { inject, injectable } from 'tsyringe';
import IListCursosDTO from '../dtos/IListCursosDTO';
import ICursosRepository from '../repositories/ICursosRepository';

@injectable()
class ListCursosService {
  constructor(
    @inject('CursosRepository')
    private cursosRepository: ICursosRepository,
  ) {}

  public async execute(): Promise<IListCursosDTO[]> {
    const cursos = await this.cursosRepository.index();

    return this.cursosRepository.ordenar(cursos);
  }
}

export default ListCursosService;
