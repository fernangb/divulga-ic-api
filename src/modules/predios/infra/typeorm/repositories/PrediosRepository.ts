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

  public async ordenar(predios: Predio[]): Promise<Predio[]> {
    return predios.sort((a, b) => (a.nome > b.nome ? 1 : -1));
  }

  public async create({
    nome,
    nomeComum,
    endereco,
  }: ICreatePredioDTO): Promise<Predio> {
    const predio = this.ormRepository.create({
      nome,
      nomeComum,
      endereco,
    });

    await this.ormRepository.save(predio);

    return predio;
  }

  public async index(): Promise<Predio[]> {
    return this.ormRepository.find();
  }
}

export default PrediosRepository;
