import Curso from '@modules/cursos/infra/typeorm/entities/Curso';

interface ICursosRepository {
  procurarCursoExistente(
    nome: string,
    tipo: string,
    turno: string,
  ): Promise<Curso | undefined>;
}

export default ICursosRepository;
