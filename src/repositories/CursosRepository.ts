import Curso from '../models/Curso';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Curso)
class CursosRepository extends Repository<Curso>{
  public async procurarCursoExistente(nome: string, tipo: string, turno: string): Promise<Curso | undefined>{
    const cursoEncontrado = await this.findOne({
      where: {
        nome,
        tipo,
        turno
      },
    });

    return cursoEncontrado;
  }

}

export default CursosRepository;
