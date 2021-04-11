import VagaIc from '@modules/vagas_ic/infra/typeorm/entities/VagaIC';
import { getRepository, In, Repository } from 'typeorm';
import InscricaoIc from '@modules/vagas_ic/infra/typeorm/entities/InscricaoIC';
import IInscricoesIcRepository from '@modules/vagas_ic/repositories/IInscricoesIcRepository';
import ICreateInscricaoIcDTO from '@modules/vagas_ic/dtos/ICreateInscricaoIcDTO';

class InscricoesIcRepository implements IInscricoesIcRepository {
  private ormRepository: Repository<InscricaoIc>;

  constructor() {
    this.ormRepository = getRepository(InscricaoIc);
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
      where: { alunoId, vagaIcId, es_ativa: true },
    });

    if (inscricao.length) return true;

    return false;
  }

  public async listarVagasInscritasPeloAluno(
    alunoId: string,
  ): Promise<InscricaoIc[]> {
    return this.ormRepository.find({ where: { alunoId, es_ativa: true } });
  }

  public async listarAlunosInscritosPorVagaIc(
    vagaIcId: string,
  ): Promise<InscricaoIc[]> {
    return this.ormRepository.find({ where: { vagaIcId, es_ativa: true }, order: {
      dtCriacao: "DESC"
    } });
  }

  public async listarAlunosInscritosPorProfessor(
    vagaIcIds: string[],
  ): Promise<InscricaoIc[]> {
    return this.ormRepository.find({
      where: { vagaIcId: In(vagaIcIds), es_ativa: true },
    });
  }
}

export default InscricoesIcRepository;
