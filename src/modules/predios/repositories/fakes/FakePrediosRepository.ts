import Predio from '@modules/predios/infra/typeorm/entities/Predio';
import IPrediosRepository from '@modules/predios/repositories/IPrediosRepository';
import ICreatePredioDTO from '@modules/predios/dtos/ICreatePredioDTO';
import { v4 as uuid_v4 } from 'uuid';

class PrediosRepository implements IPrediosRepository {
  private predios: Predio[] = [];

  public async procurarPeloNome(nome: string): Promise<Predio | undefined> {
    const predioEncontrado = this.predios.find(predio => predio.nome === nome);

    return predioEncontrado;
  }

  public async create({
    nome,
    nome_comum,
    endereco,
    id_campus,
  }: ICreatePredioDTO): Promise<Predio> {
    const predio = new Predio();

    Object.assign(predio, {
      id: uuid_v4(),
      nome,
      nome_comum,
      endereco,
      id_campus,
    });

    this.predios.push(predio);

    return predio;
  }
}

export default PrediosRepository;
