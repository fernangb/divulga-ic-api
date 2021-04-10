import { getRepository, In, Repository } from 'typeorm';
import Curso from '@modules/cursos/infra/typeorm/entities/Curso';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import ICreateCursoDTO from '@modules/cursos/dtos/ICreateCursoDTO';
import IListCursosDTO from '@modules/cursos/dtos/IListCursosDTO';

class CursosRepository implements ICursosRepository {
  private ormRepository: Repository<Curso>;

  constructor() {
    this.ormRepository = getRepository(Curso);
  }

  public async encontrarPelosNomes(nomes: string[]): Promise<Curso[]> {
    return await this.ormRepository.find({ where: {nome: In(nomes), order: {
      nome: "ASC"
    }}});
  }

  public async encontrarPeloNome(nome: string): Promise<Curso | undefined> {
    const cursoEncontrado = await this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return cursoEncontrado;
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

  public async create({
    nome,
    predioId,
    endereco,
    tipo,
    turno,
    nrPeriodos,
  }: ICreateCursoDTO): Promise<Curso> {
    const curso = this.ormRepository.create({
      nome,
      predioId,
      endereco,
      tipo,
      turno,
      nrPeriodos,
    });

    await this.ormRepository.save(curso);

    return curso;
  }

  public async index(): Promise<IListCursosDTO[]> {
    return this.ormRepository.find({
      select: [
        'nome',
        'id'
      ],
      order: {
        nome: "ASC"
      }
    });
  }
}

export default CursosRepository;
