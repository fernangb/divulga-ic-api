import IConverterDataFormatoIsoDTO from '../dtos/IConverterDataFormatoIsoDTO';

export default interface IMailProvider {
  converterFormatoISO(data: IConverterDataFormatoIsoDTO): Date;
}
