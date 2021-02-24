import ICreateNotificacoesDTO from '../dtos/ICreateNotificacoesDTO';
import Notificacao from '../infra/typeorm/schemas/Notificacao';

export default interface INotificaoesRepository {
  create(data: ICreateNotificacoesDTO): Promise<Notificacao>;
}
