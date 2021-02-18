import Campus from '@modules/campus/infra/typeorm/entities/Campus';
import ICreateCampusDTO from '../dtos/ICreateCampusDTO';

interface ICampusRepository {
  create(data: ICreateCampusDTO): Promise<Campus>;

  procurarPeloNome(nome: string): Promise<Campus | undefined>;
}

export default ICampusRepository;
