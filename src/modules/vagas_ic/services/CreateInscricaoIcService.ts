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
    vagaIcId,
    alunoId,
  }: ICreateInscricaoIcDTO): Promise<InscricaoIC> {
    const vagaEncontrada = await this.vagasIcRepository.encontrarPeloId(
      vagaIcId,
    );

    if (!vagaEncontrada)
      throw new AppError('Não existe a vaga de IC desejada.');

    const existeInscricao = await this.inscricoesIcRepository.encontrarInscricaoExistente(
      { alunoId, vagaIcId },
    );

    if (existeInscricao) throw new AppError('Inscrição já realizada.');

    const inscricaoIC = await this.inscricoesIcRepository.create({
      vagaIcId,
      alunoId,
    });

    await this.vagasIcRepository.aumentarNumeroInscritos(vagaEncontrada);

    return inscricaoIC;
  }
}

export default CreateInscricaoIcService;
