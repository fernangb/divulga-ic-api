import IEnviarEmailDTO from '../dtos/IEnviarEmailDTO';
import IMailProvider from '../models/IMailProvider';

export default class FakeMailProvider implements IMailProvider {
  private mensagens: IEnviarEmailDTO[] = [];

  public async enviarEmail(mensagem: IEnviarEmailDTO): Promise<void> {
    this.mensagens.push(mensagem);
  }
}
