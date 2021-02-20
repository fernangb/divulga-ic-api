export default interface IHashProvider {
  gerarHash(payload: string): Promise<string>;
  compararHash(payload: string, hashed: string): Promise<boolean>;
}
