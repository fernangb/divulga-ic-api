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
  usuarioId: string;
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
    usuarioId,
    siape,
  }: IRequest): Promise<Professor> {
    if (!usuarioId) {
      await this.usuariosRepository.delete(usuarioId);

      throw new AppError('ID usuário não existe.');
    }

    const cursoProfessor = await this.cursosRepository.encontrarPeloNome(curso);

    if (!cursoProfessor) {
      await this.usuariosRepository.delete(usuarioId);

      throw new AppError('Curso inválido.');
    }

    const laboratorioProfessor = await this.laboratoriosRepository.encontrarPelaSigla(laboratorio);

    if (!laboratorioProfessor) {
      await this.usuariosRepository.delete(usuarioId);

      throw new AppError('Laboratório inválido.');
    }

    const professorEncotrado = await this.professoresRepository.encontrarPeloSIAPE(
      siape,
    );

    if (professorEncotrado) {
      await this.usuariosRepository.delete(usuarioId);

      throw new AppError('Professor já cadastrado.');
    }

    const siapeValido = this.professoresRepository.validarSIAPE(siape);

    if (!siapeValido) {
      await this.usuariosRepository.delete(usuarioId);

      throw new AppError('SIAPE inválido.');
    }

    const professor = await this.professoresRepository.create({
      laboratorioId: laboratorioProfessor.id,
      cursoId: cursoProfessor.id,
      usuarioId,
      siape,
    });

    return professor;
  }
}

export default CreateProfessorService;
