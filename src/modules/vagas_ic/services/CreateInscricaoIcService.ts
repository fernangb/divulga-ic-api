/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from 'tsyringe';
import INotificacoesRepository from '@modules/notificacoes/repositories/INotificaoesRepository';
import { format } from 'date-fns';
import AppError from '@shared/errors/AppError';
import ICreateInscricaoIcDTO from '../dtos/ICreateInscricaoIcDTO';
import InscricaoIC from '../infra/typeorm/entities/InscricaoIC';
import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';

@injectable()
class CreateInscricaoIcService {
  constructor(
    @inject('InscricoesIcRepository')
    private inscricoesIcRepository: IInscricoesIcRepository,
    @inject('NotificacoesRepository')
    private notificacoesRepository: INotificacoesRepository,
  ) {}

  public async execute({
    id_vaga,
    id_aluno,
  }: ICreateInscricaoIcDTO): Promise<InscricaoIC> {
    const existeInscricao = await this.inscricoesIcRepository.encontrarInscricaoExistente(
      { id_aluno, id_vaga },
    );

    if (existeInscricao) throw new AppError('Inscrição já realizada.');

    const inscricaoIC = await this.inscricoesIcRepository.create({
      id_vaga,
      id_aluno,
    });

    const dataFormatada = format(new Date(), "dd/MM/yyyy 'às' HH:mm");

    await this.notificacoesRepository.create({
      id_usuario: id_aluno,
      mensagem: `${id_aluno} se inscreveu na vaga ${id_vaga} no dia ${dataFormatada} `,
    });
    return inscricaoIC;
  }
}

export default CreateInscricaoIcService;
