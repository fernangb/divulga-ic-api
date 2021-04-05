import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import ICreateCursoDTO from '../dtos/ICreateCursoDTO';
import IListCursosDTO from '../dtos/IListCursosDTO';

interface ICursosRepository {
  create(data: ICreateCursoDTO): Promise<Curso>;
  encontrarPeloId(id: string): Promise<Curso | undefined>;
  encontrarPeloNome(id: string): Promise<Curso | undefined>;
  encontrarCursoExistente(
    nome: string,
    tipo: string,
    turno: string,
  ): Promise<Curso | undefined>;
  index(): Promise<IListCursosDTO[]>;
  ordenar(curso: Curso[]): Promise<Curso[]>;
}

export default ICursosRepository;
