import Nivel from '@modules/usuarios/infra/typeorm/entities/Nivel';
import ICreateNivelDTO from '../dtos/ICreateNivelDTO';

interface INivelsRepository {
  create(data: ICreateNivelDTO): Promise<Nivel>;

  encontrarPeloNome(nome: string): Promise<Nivel | undefined>;
}

export default INivelsRepository;
