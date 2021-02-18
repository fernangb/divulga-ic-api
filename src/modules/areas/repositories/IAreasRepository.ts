import Area from '@modules/areas/infra/typeorm/entities/Area';

interface IAreasRepository {
  procurarPeloNome(nome: string): Promise<Area | undefined>;
}

export default IAreasRepository;
