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
    return this.cursosRepository.index();
  }
}

export default ListCursosService;
