/* eslint-disable no-param-reassign */
import IProfessoresRepository from '@modules/professores/repositories/IProfessoresRepository';
import InscricaoIc from '@modules/vagas_ic/infra/typeorm/entities/InscricaoIC';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListAlunosInscritosPorProfessorService {
  constructor(
    @inject('InscricoesIcRepository')
    private inscricoesIcRepository: IInscricoesIcRepository,
    @inject('ProfessoresRepository')
    private professoresRepository: IProfessoresRepository,
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<InscricaoIc[]> {
    const professor = await this.professoresRepository.encontrarPeloId(id);

    if (!professor) throw new AppError('Professor não encontrado.');

    const vagas = await this.vagasIcRepository.listarVagasCriadasPeloProfessor({
      professorId: professor.id,
    });

    if (!vagas) throw new AppError('Vaga não encontrada.');

    const vagaIcIds = vagas.map(v => v.id);

    const inscricoes = await this.inscricoesIcRepository.listarAlunosInscritosPorProfessor(
      vagaIcIds,
    );

    return inscricoes;
  }
}

export default ListAlunosInscritosPorProfessorService;
