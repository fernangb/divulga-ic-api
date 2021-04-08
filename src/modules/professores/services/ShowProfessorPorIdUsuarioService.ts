import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Professor from '../infra/typeorm/entities/Professor';
import IProfessoresRepository from '../repositories/IProfessoresRepository';

@injectable()
class ShowProfessorPorIdUsuarioService {
  constructor(
    @inject('ProfessoresRepository')
    private professoresRepository: IProfessoresRepository,
  ) {}

  public async execute(usuarioId: string): Promise<Professor | undefined> {
    const professor = await this.professoresRepository.encontrarPeloIdUsuario(
      usuarioId,
    );

    if (!professor)
      throw new AppError('Não existe professor com o id especificado');

    return professor;
  }
}

export default ShowProfessorPorIdUsuarioService;
