import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import ILaboratoriosRepository from '@modules/laboratorios/repositories/ILaboratoriosRepository';
import Professor from '@modules/professores/infra/typeorm/entities/Professor';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IProfessoresRepository from '../repositories/IProfessoresRepository';

interface IRequest {
  curso: string;
  laboratorio: string;
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

    @inject('CursosRepository')
    private cursosRepository: ICursosRepository,

    @inject('LaboratoriosRepository')
    private laboratoriosRepository: ILaboratoriosRepository,
  ) {}

  public async execute({
    laboratorio,
    curso,
    id_usuario,
    siape,
  }: IRequest): Promise<Professor> {
    if (!id_usuario) {
      await this.usuariosRepository.delete(id_usuario);

      throw new AppError('ID usuário não existe.');
    }

    const cursoProfessor = await this.cursosRepository.encontrarPeloNome(curso);

    if (!cursoProfessor) {
      await this.usuariosRepository.delete(id_usuario);

      throw new AppError('Curso inválido.');
    }

    const laboratorioProfessor = await this.laboratoriosRepository.encontrarPelaSigla(laboratorio);

    if (!laboratorioProfessor) {
      await this.usuariosRepository.delete(id_usuario);

      throw new AppError('Laboratório inválido.');
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
      id_laboratorio: laboratorioProfessor.id,
      id_curso: cursoProfessor.id,
      id_usuario,
      siape,
    });

    return professor;
  }
}

export default CreateProfessorService;
