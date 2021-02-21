import IEnviarEmailDTO from '../dtos/IEnviarEmailDTO';

export default interface IMailProvider {
  enviarEmail(data: IEnviarEmailDTO): Promise<void>;
}
