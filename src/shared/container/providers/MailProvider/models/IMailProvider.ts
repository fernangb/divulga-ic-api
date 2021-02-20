export default interface IMailProvider {
  enviarEmail(to: string, body: string): Promise<void>;
}
