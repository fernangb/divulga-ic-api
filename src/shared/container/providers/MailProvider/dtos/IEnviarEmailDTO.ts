import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContext {
  name: string;
  email: string;
}

export default interface IEnviarEmailDTO {
  to: IMailContext;
  from?: IMailContext;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
