import ICreateInscricaoIcDTO from '../dtos/ICreateInscricaoIcDTO';
import InscricaoIc from '../infra/typeorm/entities/InscricaoIC';

export default interface IInscricoesIcRepository {
  create(data: ICreateInscricaoIcDTO): Promise<InscricaoIc>;
  index(): Promise<InscricaoIc[]>;
}
