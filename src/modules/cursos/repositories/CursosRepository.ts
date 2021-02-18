import { EntityRepository, Repository } from 'typeorm';
import Curso from '../infra/typeorm/entities/Curso';

@EntityRepository(Curso)
class CursosRepository extends Repository<Curso> {
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
