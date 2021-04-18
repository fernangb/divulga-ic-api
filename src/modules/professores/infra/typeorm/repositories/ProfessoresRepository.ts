import { getRepository, Repository } from 'typeorm';
import Professor from '@modules/professores/infra/typeorm/entities/Professor';
import IProfessoresRepository from '@modules/professores/repositories/IProfessoresRepository';
import ICreateProfessorDTO from '@modules/professores/dtos/ICreateProfessorDTO';

class ProfessoresRepository implements IProfessoresRepository {
  private ormRepository: Repository<Professor>;

  constructor() {
    this.ormRepository = getRepository(Professor);
  }

  public async encontrarPeloId(id: string): Promise<Professor | undefined> {
    const professorEncontrado = await this.ormRepository.findOne(id);

    return professorEncontrado;
  }

  public async encontrarPeloIdUsuario(
    usuarioId: string,
  ): Promise<Professor | undefined> {
    const professorEncontrado = await this.ormRepository.findOne({
      where: {
        usuarioId,
      },
    });

    return professorEncontrado;
  }

  public async encontrarPeloSIAPE(
    siape: string,
  ): Promise<Professor | undefined> {
    const professorEncontrado = await this.ormRepository.findOne({
      where: {
        siape,
      },
    });

    return professorEncontrado;
  }

  public async create({
    cursoId,
    usuarioId,
    laboratorioId,
    siape,
  }: ICreateProfessorDTO): Promise<Professor> {
    const professor = this.ormRepository.create({
      cursoId,
      usuarioId,
      laboratorioId,
      siape,
    });

    await this.ormRepository.save(professor);

    return professor;
  }

  public async save(professor: Professor): Promise<Professor> {
    return this.ormRepository.save(professor);
  }
}

export default ProfessoresRepository;
