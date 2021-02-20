import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import ICreateCursoDTO from '@modules/cursos/dtos/ICreateCursoDTO';
import { v4 as uuid_v4 } from 'uuid';

class FakeCursosRepository implements ICursosRepository {
  private cursos: Curso[] = [];

  public async procurarCursoExistente(
    nome: string,
    tipo: string,
    turno: string,
  ): Promise<Curso | undefined> {
    const cursoEncontrado = this.cursos.find(
      curso =>
        curso.nome === nome && curso.tipo === tipo && curso.turno === turno,
    );

    return cursoEncontrado;
  }

  public async create({
    nome,
    id_predio,
    endereco,
    tipo,
    turno,
  }: ICreateCursoDTO): Promise<Curso> {
    const curso = new Curso();

    Object.assign(curso, {
      id: uuid_v4(),
      nome,
      id_predio,
      endereco,
      tipo,
      turno,
    });

    this.cursos.push(curso);

    return curso;
  }
}

export default FakeCursosRepository;
