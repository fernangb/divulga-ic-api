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
    id_usuario: string,
  ): Promise<Professor | undefined> {
    const professorEncontrado = await this.ormRepository.findOne({
      where: {
        id_usuario,
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

  public validarSIAPE(siape: string): boolean {
    if (siape.length !== 7) {
      return false;
    }

    // eslint-disable-next-line radix
    const siapeInt = parseInt(siape);

    if (!siapeInt) {
      return false;
    }

    return true;
  }

  public async create({
    id_curso,
    id_usuario,
    id_laboratorio,
    siape,
  }: ICreateProfessorDTO): Promise<Professor> {
    const professor = this.ormRepository.create({
      id_curso,
      id_usuario,
      id_laboratorio,
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
