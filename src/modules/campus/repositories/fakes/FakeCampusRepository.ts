import Campus from '@modules/campus/infra/typeorm/entities/Campus';
import ICampusRepository from '@modules/campus/repositories/ICampusRepository';
import ICreateCampusDTO from '@modules/campus/dtos/ICreateCampusDTO';
import { v4 as uuid_v4 } from 'uuid';

class CampusRepository implements ICampusRepository {
  private campus: Campus[] = [];

  public async encontrarPeloNome(nome: string): Promise<Campus | undefined> {
    const areaEncontrada = this.campus.find(c => c.nome === nome);

    return areaEncontrada;
  }

  public async create({
    nome,
    nome_comum,
    endereco,
  }: ICreateCampusDTO): Promise<Campus> {
    const area = new Campus();

    Object.assign(area, { id: uuid_v4(), nome, nome_comum, endereco });

    this.campus.push(area);

    return area;
  }
}

export default CampusRepository;
