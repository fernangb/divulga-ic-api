import Professor from '@modules/professores/infra/typeorm/entities/Professor';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
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

    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({
    id_laboratorio,
    id_curso,
    id_usuario,
    siape,
  }: IRequest): Promise<Professor> {
    if (!id_usuario) {
      await this.usuariosRepository.delete(id_usuario);

      throw new AppError('ID usuário não existe.');
    }

    const professorEncotrado = await this.professoresRepository.encontrarPeloSIAPE(
      siape,
    );

    if (professorEncotrado) {
      await this.usuariosRepository.delete(id_usuario);

      throw new AppError('Professor já cadastrado.');
    }

    const siapeValido = this.professoresRepository.validarSIAPE(siape);

    if (!siapeValido) {
      await this.usuariosRepository.delete(id_usuario);

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
