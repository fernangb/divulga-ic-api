/* eslint-disable no-param-reassign */
import IProfessoresRepository from '@modules/professores/repositories/IProfessoresRepository';
import InscricaoIc from '@modules/vagas_ic/infra/typeorm/entities/InscricaoIC';
import IDateProvider from '@shared/container/providers/DateProvider/models/IDateProvider';
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
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<InscricaoIc[]> {
    const professor = await this.professoresRepository.encontrarPeloId(id);

    if (!professor) throw new AppError('Professor não encontrado');

    const vagas = await this.vagasIcRepository.listarVagasCriadasPeloProfessor({
      id_professor: professor.id,
    });

    if (!vagas) throw new AppError('Vaga não encontrada');

    const id_vagas = vagas.map(v => v.id);

    const inscricoes = await this.inscricoesIcRepository.listarAlunosInscritosPorProfessor(
      id_vagas,
    );

    // const vagaAtualizada = { ...vaga, nr_inscritos: nr_inscritos_atualizado };

    const inscricoesComDataAtualizada = inscricoes.map(inscricao => {
      const date = inscricao.dt_criacao;
      const dataFormatada = this.dateProvider.converterFormatoISO({
        date,
      });

      return {
        ...inscricao,
        dt_criacao: dataFormatada,
      };
    });

    return inscricoesComDataAtualizada;
  }
}

export default ListAlunosInscritosPorProfessorService;
