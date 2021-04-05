/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from 'tsyringe';
import { format } from 'date-fns';
import AppError from '@shared/errors/AppError';
import ICreateInscricaoIcDTO from '../dtos/ICreateInscricaoIcDTO';
import InscricaoIC from '../infra/typeorm/entities/InscricaoIC';
import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

@injectable()
class CreateInscricaoIcService {
  constructor(
    @inject('InscricoesIcRepository')
    private inscricoesIcRepository: IInscricoesIcRepository,
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
  ) {}

  public async execute({
    id_vaga,
    id_aluno,
  }: ICreateInscricaoIcDTO): Promise<InscricaoIC> {
    const vagaEncontrada = await this.vagasIcRepository.encontrarPeloId(
      id_vaga,
    );

    if (!vagaEncontrada)
      throw new AppError('Não existe a vaga de IC desejada.');

    const existeInscricao = await this.inscricoesIcRepository.encontrarInscricaoExistente(
      { id_aluno, id_vaga },
    );

    if (existeInscricao) throw new AppError('Inscrição já realizada.');

    const inscricaoIC = await this.inscricoesIcRepository.create({
      id_vaga,
      id_aluno,
    });

    await this.vagasIcRepository.aumentarNumeroInscritos(vagaEncontrada);

    return inscricaoIC;
  }
}

export default CreateInscricaoIcService;
