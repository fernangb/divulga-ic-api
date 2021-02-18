import { getRepository, Repository } from 'typeorm';
import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import ICreateCursoDTO from '@modules/cursos/dtos/ICreateCursoDTO';

class CursosRepository implements ICursosRepository {
  private ormRepository: Repository<Curso>;

  constructor() {
    this.ormRepository = getRepository(Curso);
  }

  public async procurarCursoExistente(
    nome: string,
    tipo: string,
    turno: string,
  ): Promise<Curso | undefined> {
    const cursoEncontrado = await this.ormRepository.findOne({
      where: {
        nome,
        tipo,
        turno,
      },
    });

    return cursoEncontrado;
  }

  public async create({
    nome,
    id_predio,
    endereco,
    tipo,
    turno,
  }: ICreateCursoDTO): Promise<Curso> {
    const curso = this.ormRepository.create({
      nome,
      id_predio,
      endereco,
      tipo,
      turno,
    });

    await this.ormRepository.save(curso);

    return curso;
  }
}

export default CursosRepository;
