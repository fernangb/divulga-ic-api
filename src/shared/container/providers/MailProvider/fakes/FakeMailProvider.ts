import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private mensagens: IMessage[] = [];

  public async enviarEmail(to: string, body: string): Promise<void> {
    this.mensagens.push({ to, body });
  }
}
