import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async gerarHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compararHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
