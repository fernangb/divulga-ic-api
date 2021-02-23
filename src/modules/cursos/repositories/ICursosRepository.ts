import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import ICreateCursoDTO from '../dtos/ICreateCursoDTO';

interface ICursosRepository {
  create(data: ICreateCursoDTO): Promise<Curso>;
  encontrarPeloId(id: string): Promise<Curso | undefined>;
  encontrarCursoExistente(
    nome: string,
    tipo: string,
    turno: string,
  ): Promise<Curso | undefined>;
  list(): Promise<Curso[]>;
  ordenar(curso: Curso[]): Promise<Curso[]>;
}

export default ICursosRepository;
