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
    id_vaga,
    id_aluno,
  }: ICreateInscricaoIcDTO): Promise<InscricaoIc> {
    const inscricaoIc = this.ormRepository.create({
      id_vaga,
      id_aluno,
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
    id_aluno,
    id_vaga,
  }: ICreateInscricaoIcDTO): Promise<boolean> {
    const inscricao = await this.ormRepository.find({
      where: { id_aluno, id_vaga, es_ativa: true },
    });

    if (inscricao.length) return true;

    return false;
  }

  public async listarVagasInscritasPeloAluno(
    id_aluno: string,
  ): Promise<InscricaoIc[]> {
    return this.ormRepository.find({ where: { id_aluno, es_ativa: true } });
  }

  public async listarAlunosInscritosPorVagaIc(
    id_vaga: string,
  ): Promise<InscricaoIc[]> {
    return this.ormRepository.find({ where: { id_vaga, es_ativa: true } });
  }

  public async listarAlunosInscritosPorProfessor(
    id_vagas: string[],
  ): Promise<InscricaoIc[]> {
    return this.ormRepository.find({
      where: { id_vaga: In(id_vagas), es_ativa: true },
    });
  }
}

export default InscricoesIcRepository;
