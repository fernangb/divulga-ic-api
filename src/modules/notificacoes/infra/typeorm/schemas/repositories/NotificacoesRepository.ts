import { getMongoRepository, MongoRepository } from 'typeorm';
import Notificacao from '@modules/notificacoes/infra/typeorm/schemas/Notificacao';
import INotificacoesRepository from '@modules/notificacoes/repositories/INotificaoesRepository';
import ICreateNotificacaoDTO from '@modules/notificacoes/dtos/ICreateNotificacaoDTO';

class NotificacoesRepository implements INotificacoesRepository {
  private ormRepository: MongoRepository<Notificacao>;

  constructor() {
    this.ormRepository = getMongoRepository(Notificacao, 'mongo');
  }

  public async create({
    mensagem,
    id_usuario,
  }: ICreateNotificacaoDTO): Promise<Notificacao> {
    const notificacao = this.ormRepository.create({ id_usuario, mensagem });

    await this.ormRepository.save(notificacao);

    return notificacao;
  }
}

export default NotificacoesRepository;
