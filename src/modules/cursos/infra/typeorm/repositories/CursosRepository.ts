import { getRepository, Repository } from 'typeorm';
import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import ICreateCursoDTO from '@modules/cursos/dtos/ICreateCursoDTO';
import IListCursosDTO from '@modules/cursos/dtos/IListCursosDTO';

class CursosRepository implements ICursosRepository {
  private ormRepository: Repository<Curso>;

  constructor() {
    this.ormRepository = getRepository(Curso);
  }

  public async encontrarPeloId(id: string): Promise<Curso | undefined> {
    const cursoEncontrado = await this.ormRepository.findOne(id);

    return cursoEncontrado;
  }

  public async encontrarCursoExistente(
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

  public async ordenar(cursos: Curso[]): Promise<Curso[]> {
    return cursos.sort((a, b) => (a.nome > b.nome ? 1 : -1));
  }

  public async create({
    nome,
    id_predio,
    endereco,
    tipo,
    turno,
    nr_periodos,
  }: ICreateCursoDTO): Promise<Curso> {
    const curso = this.ormRepository.create({
      nome,
      id_predio,
      endereco,
      tipo,
      turno,
      nr_periodos,
    });

    await this.ormRepository.save(curso);

    return curso;
  }

  public async index(): Promise<IListCursosDTO[]> {
    return this.ormRepository.find({
      select: [
        'nome',
        'id'
      ]
    });
  }
}

export default CursosRepository;
