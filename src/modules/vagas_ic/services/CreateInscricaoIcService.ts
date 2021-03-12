import { inject, injectable } from 'tsyringe';
import INotificacoesRepository from '@modules/notificacoes/repositories/INotificaoesRepository';
// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IAlunosRepository from '@modules/alunos/repositories/IAlunosRepository';
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

    console.log(existeInscricao);

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
