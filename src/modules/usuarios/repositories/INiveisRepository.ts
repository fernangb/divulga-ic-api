import Nivel from '@modules/usuarios/infra/typeorm/entities/Nivel';

interface INivelsRepository {
  procurarPeloNome(nome: string): Promise<Nivel | undefined>;
}

export default INivelsRepository;
