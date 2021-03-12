import { getRepository, Repository } from 'typeorm';
import InscricaoIc from '@modules/vagas_ic/infra/typeorm/entities/InscricaoIC';
import IInscricoesIcRepository from '@modules/vagas_ic/repositories/IInscricoesIcRepository';
import ICreateInscricaoIcDTO from '@modules/vagas_ic/dtos/ICreateInscricaoIcDTO';

class InscricoesIcRepository implements IInscricoesIcRepository {
  private ormRepository: Repository<InscricaoIc>;

  constructor() {
    this.ormRepository = getRepository(InscricaoIc);
  }

  listarVagasInscritasPeloAluno(id_aluno: string): Promise<InscricaoIc[]> {
    return this.ormRepository.find({ where: { id_aluno, es_ativa: true } });

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
}

export default InscricoesIcRepository;
