import { inject, injectable } from 'tsyringe';
import ICreateInscricaoIcDTO from '../dtos/ICreateInscricaoIcDTO';
import InscricaoIC from '../infra/typeorm/entities/InscricaoIC';
import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';

@injectable()
class CreateInscricaoIcService {
  constructor(
    @inject('InscricoesIcRepository')
    private inscricoesIcRepository: IInscricoesIcRepository,
  ) {}

  public async execute({
    id_vaga,
    id_aluno,
  }: ICreateInscricaoIcDTO): Promise<InscricaoIC> {
    const inscricaoIC = await this.inscricoesIcRepository.create({
      id_vaga,
      id_aluno,
    });

    return inscricaoIC;
  }
}

export default CreateInscricaoIcService;
