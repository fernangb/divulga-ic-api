import { inject, injectable } from 'tsyringe';
import INotificacoesRepository from '@modules/notificacoes/repositories/INotificaoesRepository';
// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import IAlunosRepository from '@modules/alunos/repositories/IAlunosRepository';
import ICreateInscricaoIcDTO from '../dtos/ICreateInscricaoIcDTO';
import InscricaoIC from '../infra/typeorm/entities/InscricaoIC';
import IInscricoesIcRepository from '../repositories/IInscricoesIcRepository';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

@injectable()
class CreateInscricaoIcService {
  constructor(
    @inject('InscricoesIcRepository')
    private inscricoesIcRepository: IInscricoesIcRepository,
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
    @inject('AlunosRepository')
    private alunosRepository: IAlunosRepository,
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('NotificacoesRepository')
    private notificacoesRepository: INotificacoesRepository,
  ) {}

  public async execute({
    id_vaga,
    id_aluno,
  }: ICreateInscricaoIcDTO): Promise<InscricaoIC> {
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
