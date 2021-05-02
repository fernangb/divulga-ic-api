import { getRepository, In, Repository } from 'typeorm';
import InscricaoIc from '@modules/vagas_ic/infra/typeorm/entities/InscricaoIC';
import IInscricoesIcRepository from '@modules/vagas_ic/repositories/IInscricoesIcRepository';
import ICreateInscricaoIcDTO from '@modules/vagas_ic/dtos/ICreateInscricaoIcDTO';

class InscricoesIcRepository implements IInscricoesIcRepository {
  private ormRepository: Repository<InscricaoIc>;

  constructor() {
    this.ormRepository = getRepository(InscricaoIc);
  }

  public async ativarInscricoes(vagaId: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(InscricaoIc)
      .set({ esAtiva: true })
      .where('vagaIcId = :vagaId', { vagaId })
      .execute();
  }

  public async desativarInscricoes(vagaId: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(InscricaoIc)
      .set({ esAtiva: false })
      .where('vagaIcId = :vagaId', { vagaId })
      .execute();
  }

  public async update(inscricaoIc: InscricaoIc): Promise<InscricaoIc> {
    return this.ormRepository.save(inscricaoIc);
  }

  public async eliminarAlunoInscrito(inscricaoIc: InscricaoIc): Promise<void> {
    const novaInscricaoIc = {
      ...inscricaoIc,
      esAtiva: false,
      esSelecionado: false,
    };

    await this.ormRepository.save(novaInscricaoIc);
  }

  public async selecionarAlunoInscrito(
    inscricaoIc: InscricaoIc,
  ): Promise<void> {
    const novaInscricaoIc = {
      ...inscricaoIc,
      esSelecionado: true,
    };

    await this.ormRepository.save(novaInscricaoIc);
  }

  public async create({
    vagaIcId,
    alunoId,
  }: ICreateInscricaoIcDTO): Promise<InscricaoIc> {
    const inscricaoIc = this.ormRepository.create({
      vagaIcId,
      alunoId,
    });

    await this.ormRepository.save(inscricaoIc);

    return inscricaoIc;
  }

  public async index(): Promise<InscricaoIc[]> {
    return this.ormRepository.find();
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async encontrarPeloId(id: string): Promise<InscricaoIc | undefined> {
    const inscricaoEncontrada = await this.ormRepository.findOne(id);

    return inscricaoEncontrada;
  }

  public async encontrarInscricaoExistente({
    alunoId,
    vagaIcId,
  }: ICreateInscricaoIcDTO): Promise<boolean> {
    const inscricao = await this.ormRepository.find({
      where: { alunoId, vagaIcId, esAtiva: true },
    });

    if (inscricao.length) return true;

    return false;
  }

  public async listarAlunosSelecionados(
    vagaId: string,
  ): Promise<InscricaoIc[]> {
    return this.ormRepository.find({
      where: { vagaIcId: vagaId, esSelecionado: true },
      order: {
        esAtiva: 'DESC',
      },
    });
  }

  public async listarVagasInscritasPeloAluno(
    alunoId: string,
  ): Promise<InscricaoIc[]> {
    return this.ormRepository.find({
      where: { alunoId },
      order: {
        esAtiva: 'DESC',
      },
    });
  }

  public async listarVagasInscritasAtivasPeloAluno(
    alunoId: string,
  ): Promise<InscricaoIc[]> {
    return this.ormRepository.find({ where: { alunoId, esAtiva: true } });
  }

  public async listarAlunosInscritosPorVagaIc(
    vagaIcId: string,
  ): Promise<InscricaoIc[]> {
    return this.ormRepository.find({
      where: { vagaIcId, esAtiva: true },
      order: {
        dtCriacao: 'DESC',
      },
    });
  }

  public async listarAlunosInscritosPorProfessor(
    vagaIcIds: string[],
  ): Promise<InscricaoIc[]> {
    return this.ormRepository.find({
      where: { vagaIcId: In(vagaIcIds), esAtiva: true },
    });
  }
}

export default InscricoesIcRepository;
