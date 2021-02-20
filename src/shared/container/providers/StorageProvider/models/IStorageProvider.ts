export default interface IStorageProvider {
  salvarArquivo(arquivo: string): Promise<string>;
  deletarArquivo(arquivo: string): Promise<void>;
}
