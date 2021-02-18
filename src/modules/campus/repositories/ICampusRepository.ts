import Campus from '@modules/campus/infra/typeorm/entities/Campus';

interface ICampusRepository {
  procurarPeloNome(nome: string): Promise<Campus | undefined>;
}

export default ICampusRepository;
