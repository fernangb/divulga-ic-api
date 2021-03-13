import IProfessoresRepository from '@modules/professores/repositories/IProfessoresRepository';
import VagaIc from '@modules/vagas_ic/infra/typeorm/entities/VagaIC';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

interface IRequest {
  id_usuario: string;
}

@injectable()
class ListVagasIcCriadasPeloProfessorService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('ProfessoresRepository')
    private professoresRepository: IProfessoresRepository,
  ) {}

  public async execute({ id_usuario }: IRequest): Promise<VagaIc[]> {
    const professor = await this.professoresRepository.encontrarPeloIdUsuario(
      id_usuario,
    );
    if (!professor) {
      throw new AppError('Professor não encontrado');
    }

    const vagasCriadas = await this.vagasIcRepository.listarVagasCriadasPeloProfessor(
      { id_professor: professor.id },
    );

    return vagasCriadas;
  }
}

export default ListVagasIcCriadasPeloProfessorService;
