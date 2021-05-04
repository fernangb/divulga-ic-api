import IProfessoresRepository from '@modules/professores/repositories/IProfessoresRepository';
import IAreasRepository from '@modules/areas/repositories/IAreasRepository';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import ILaboratoriosRepository from '@modules/laboratorios/repositories/ILaboratoriosRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import VagaIC from '../infra/typeorm/entities/VagaIC';
import IVagasIcRepository from '../repositories/IVagasIcRepository';
import IVagasProvider from '../providers/VagasProvider/models/IVagasProvider';

interface IRequest {
  nome: string;
  descricao?: string;
  vlBolsa?: number;
  hrSemana?: number;
  crMinimo?: number;
  nrVagas?: number;
  periodoMinimo?: number;
  laboratorio: string;
  cursos: string[];
  usuarioId: string;
  areas: string[];
}
@injectable()
class CreateVagaIcService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('LaboratoriosRepository')
    private laboratoriosRepository: ILaboratoriosRepository,
    @inject('CursosRepository')
    private cursosRepository: ICursosRepository,
    @inject('AreasRepository')
    private areasRepository: IAreasRepository,
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
    @inject('ProfessoresRepository')
    private professoresRepository: IProfessoresRepository,
    @inject('VagasProvider')
    private manualVagasProvider: IVagasProvider,
  ) {}

  public async execute({
    nome,
    descricao,
    vlBolsa,
    hrSemana,
    crMinimo,
    periodoMinimo,
    nrVagas,
    laboratorio,
    cursos,
    usuarioId,
    areas,
  }: IRequest): Promise<VagaIC> {
    const usuario = await this.usuariosRepository.encontrarPeloId(usuarioId);

    if (!usuario) throw new AppError('Usuário não existe.');

    if (usuario.nivel.nome !== 'professor')
      throw new AppError(
        'Permissão negada. Apenas professores podem criar vaga de IC.',
      );

    const professor = await this.professoresRepository.encontrarPeloIdUsuario(
      usuario.id,
    );

    if (!professor) {
      throw new AppError('Professor não existe.');
    }

    const laboratorioExistente = await this.laboratoriosRepository.encontrarPelaSigla(
      laboratorio,
    );

    if (!laboratorioExistente) {
      throw new AppError('Laboratório não existe.');
    }

    const vagaEncontrada = await this.vagasIcRepository.encontrarVagaExistente({
      nome,
      laboratorioId: laboratorioExistente.id,
    });

    if (vagaEncontrada) {
      throw new AppError('Vaga já cadastrada no sistema.');
    }

    if (vlBolsa && !this.manualVagasProvider.validarValorBolsa(vlBolsa)) {
      throw new AppError('Valor da bolsa não pode ser negativo.');
    }

    if (hrSemana && !this.manualVagasProvider.validarHorasSemanais(hrSemana)) {
      throw new AppError('Horas semanais inválida. ');
    }

    if (crMinimo && !this.manualVagasProvider.validarCrMinimo(crMinimo)) {
      throw new AppError('CR mínimo inválido.');
    }

    if (
      periodoMinimo &&
      !this.manualVagasProvider.validarPeriodoMinimo(periodoMinimo)
    ) {
      throw new AppError('Período mínimo inválido.');
    }

    if (nrVagas && !this.manualVagasProvider.validarNumeroVagas(nrVagas)) {
      throw new AppError('Número de vagas não pode ser negativo.');
    }

    if (areas.length === 0) {
      throw new AppError('Número mínimo de áreas inválido.');
    }

    const areasExistentes = await this.areasRepository.encontrarPelosNomes(
      areas,
    );

    if (areasExistentes.length !== areas.length)
      throw new AppError('Áreas inválidas.');

    if (cursos.length === 0) {
      throw new AppError('Número mínimo de cursos inválido.');
    }

    const cursosExistentes = await this.cursosRepository.encontrarPelosNomes(
      cursos,
    );

    if (cursosExistentes.length !== cursos.length)
      throw new AppError('Cursos inválidos.');

    const vagaIC = await this.vagasIcRepository.create({
      nome,
      descricao,
      vlBolsa,
      hrSemana,
      crMinimo,
      periodoMinimo,
      nrVagas,
      laboratorioId: laboratorioExistente.id,
      professorId: professor.id,
      areas: areasExistentes,
      cursos: cursosExistentes,
    });

    return vagaIC;
  }
}

export default CreateVagaIcService;
