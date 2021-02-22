import Professor from '@modules/professores/infra/typeorm/entities/Professor';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IProfessoresRepository from '../repositories/IProfessoresRepository';

interface IRequest {
  id_curso: string;
  id_laboratorio: string;
  id_usuario: string;
  siape: string;
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
    siape,
  }: IRequest): Promise<Professor> {
    const professorEncotrado = await this.professoresRepository.encontrarPeloSIAPE(
      siape,
    );

    if (professorEncotrado) {
      throw new AppError('Professor já cadastrado.');
    }

    const siapeValido = await this.professoresRepository.validarSIAPE(siape);

    //  Se der erro para criar professor, deve-se excluir o usuário correspondente.
    if (!siapeValido) {
      throw new AppError('SIAPE inválido.');
    }

    const professor = await this.professoresRepository.create({
      id_laboratorio,
      id_curso,
      id_usuario,
      siape,
    });

    return professor;
  }
}

export default CreateProfessorService;
