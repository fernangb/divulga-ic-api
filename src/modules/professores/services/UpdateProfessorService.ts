import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import ILaboratoriosRepository from '@modules/laboratorios/repositories/ILaboratoriosRepository';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateProfessorDTO from '../dtos/IUpdateProfessorService';
import Professor from '../infra/typeorm/entities/Professor';
import IProfessorProvider from '../providers/ProfessorProvider/models/IProfessorProvider';
import IProfessoresRepository from '../repositories/IProfessoresRepository';

@injectable()
class UpdateProfessorService {
  constructor(
    @inject('ProfessoresRepository')
    private professoresRepository: IProfessoresRepository,
    @inject('ProfessorProvider')
    private professorProvider: IProfessorProvider,

    @inject('CursosRepository')
    private cursosRepository: ICursosRepository,

    @inject('LaboratoriosRepository')
    private laboratoriosRepository: ILaboratoriosRepository,
  ) {}

  public async execute({
    curso,
    usuarioId,
    laboratorio,
    siape,
  }: IUpdateProfessorDTO): Promise<Professor> {
    if (!usuarioId) {
      throw new AppError('Usuário não encontrado.');
    }

    const professor = await this.professoresRepository.encontrarPeloIdUsuario(
      usuarioId,
    );

    if (!professor) {
      throw new AppError('Professor não encontrado.');
    }

    if (siape) {
      const siapeValido = this.professorProvider.validarSIAPE(siape);

      if (!siapeValido) {
        throw new AppError('SIAPE inválido.');
      }

      professor.siape = siape;
    }

    if (curso) {
      const cursoValido = await this.cursosRepository.encontrarPeloNome(curso);

      if (!cursoValido) {
        throw new AppError('Curso inválido.');
      }

      professor.cursoId = cursoValido.id;
      professor.curso = cursoValido;
    }

    if (laboratorio) {
      const laboratorioValido = await this.laboratoriosRepository.encontrarPelaSigla(
        laboratorio,
      );

      if (!laboratorioValido) {
        throw new AppError('Laboratório inválido.');
      }

      professor.laboratorioId = laboratorioValido.id;
      professor.laboratorio = laboratorioValido;
    }

    return this.professoresRepository.save(professor);
  }
}

export default UpdateProfessorService;
