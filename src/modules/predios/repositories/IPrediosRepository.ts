import Predio from '@modules/predios/infra/typeorm/entities/Predio';

interface IPrediosRepository {
  procurarPeloNome(nome: string): Promise<Predio | undefined>;
}

export default IPrediosRepository;
