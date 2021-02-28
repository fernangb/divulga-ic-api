import Predio from '@modules/predios/infra/typeorm/entities/Predio';
import ICreatePredioDTO from '../dtos/ICreatePredioDTO';

interface IPrediosRepository {
  create(data: ICreatePredioDTO): Promise<Predio>;
  index(): Promise<Predio[]>;

  encontrarPeloNome(nome: string): Promise<Predio | undefined>;
  ordenar(areas: Predio[]): Promise<Predio[]>;
}

export default IPrediosRepository;
