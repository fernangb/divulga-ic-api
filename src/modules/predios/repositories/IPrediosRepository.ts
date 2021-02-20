import Predio from '@modules/predios/infra/typeorm/entities/Predio';
import ICreatePredioDTO from '../dtos/ICreatePredioDTO';

interface IPrediosRepository {
  create(data: ICreatePredioDTO): Promise<Predio>;

  encontrarPeloNome(nome: string): Promise<Predio | undefined>;
}

export default IPrediosRepository;
