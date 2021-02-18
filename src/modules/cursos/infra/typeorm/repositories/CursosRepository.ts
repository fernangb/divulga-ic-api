import { EntityRepository, Repository } from 'typeorm';
import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';

@EntityRepository(Curso)
class CursosRepository extends Repository<Curso> implements ICursosRepository {
  public async procurarCursoExistente(
    nome: string,
    tipo: string,
    turno: string,
  ): Promise<Curso | undefined> {
    const cursoEncontrado = await this.findOne({
      where: {
        nome,
        tipo,
        turno,
      },
    });

    return cursoEncontrado;
  }
}

export default CursosRepository;
