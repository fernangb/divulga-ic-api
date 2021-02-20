import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import ICreateCursoDTO from '../dtos/ICreateCursoDTO';

interface ICursosRepository {
  create(data: ICreateCursoDTO): Promise<Curso>;
  encontrarCursoExistente(
    nome: string,
    tipo: string,
    turno: string,
  ): Promise<Curso | undefined>;
}

export default ICursosRepository;
