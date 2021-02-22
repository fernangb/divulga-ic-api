import Professor from '@modules/professores/infra/typeorm/entities/Professor';
import { inject, injectable } from 'tsyringe';
import IProfessoresRepository from '../repositories/IProfessoresRepository';

interface IRequest {
  id_curso: string;
  id_laboratorio: string;
  id_usuario: string;
}

@injectable()
class CreateProfessorService {
  constructor(
    @inject('ProfessoresRepository')
    private professoresRepository: IProfessoresRepository,
  ) {}

  public async execute({
    id_laboratorio,
    id_curso,
    id_usuario,
  }: IRequest): Promise<Professor> {
    const professor = await this.professoresRepository.create({
      id_laboratorio,
      id_curso,
      id_usuario,
    });

    return professor;
  }
}

export default CreateProfessorService;
