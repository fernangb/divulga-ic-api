import IHashProvider from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async gerarHash(payload: string): Promise<string> {
    return payload;
  }

  public async compararHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
