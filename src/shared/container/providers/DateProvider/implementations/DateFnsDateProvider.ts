/* eslint-disable import/no-extraneous-dependencies */
import { format, parseISO } from 'date-fns';
import { zonedTimeToUtc,  } from 'date-fns-tz';
import IConverterDataFormatoIsoDTO from '../dtos/IConverterDataFormatoIsoDTO';
import IDateProvider from '../models/IDateProvider';

export default class DateFnsDateProvider implements IDateProvider {
  converterFormatoISO({ date }: IConverterDataFormatoIsoDTO): Date {
    const isoDate = parseISO(date.toISOString());

    const znDate = zonedTimeToUtc(date, 'America/Sao_Paulo');

    const newDate = format(znDate, 'dd/MM/yyyy hh:mm');

    const znDate2 = zonedTimeToUtc(date, 'America/Sao_Paulo');

    const znDate3 = date.toString();
    const znDate4 = date.toUTCString();

    console.log('Date: ',date);
    console.log('Newdate: ',newDate);
    console.log('znDate: ',znDate);
    console.log('znDate2: ',znDate2);
    console.log('znDate3: ',znDate3);
    console.log('znDate4: ',znDate4);



    return date;
  }
}
