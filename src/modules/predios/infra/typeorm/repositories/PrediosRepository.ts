import { getRepository, Repository } from 'typeorm';
import Predio from '@modules/predios/infra/typeorm/entities/Predio';
import IPrediosRepository from '@modules/predios/repositories/IPrediosRepository';
import ICreatePredioDTO from '@modules/predios/dtos/ICreatePredioDTO';

class PrediosRepository implements IPrediosRepository {
  private ormRepository: Repository<Predio>;

  constructor() {
    this.ormRepository = getRepository(Predio);
  }

  public async encontrarPeloNome(nome: string): Promise<Predio | undefined> {
    const predioEncontrado = await this.ormRepository.findOne({
      where: {
        nome,
      },
    });

    return predioEncontrado;
  }

  public async create({
    nome,
    nome_comum,
    endereco,
    id_campus,
  }: ICreatePredioDTO): Promise<Predio> {
    const predio = this.ormRepository.create({
      nome,
      nome_comum,
      endereco,
      id_campus,
    });

    await this.ormRepository.save(predio);

    return predio;
  }
}

export default PrediosRepository;
