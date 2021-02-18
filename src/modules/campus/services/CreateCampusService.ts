import Campus from '@modules/campus/infra/typeorm/entities/Campus';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICampusRepository from '../repositories/ICampusRepository';

interface IRequest {
  nome: string;
  endereco: string;
  nome_comum: string;
}

@injectable()
class CreateCampusService {
  constructor(
    @inject('CampusRepository')
    private campusRepository: ICampusRepository,
  ) {}

  public async execute({
    nome,
    endereco,
    nome_comum,
  }: IRequest): Promise<Campus> {
    const campusEncontrado = await this.campusRepository.procurarPeloNome(nome);

    if (campusEncontrado) {
      throw new AppError('Campus já cadastrado no sistema.');
    }

    const campus = await this.campusRepository.create({
      nome,
      endereco,
      nome_comum,
    });

    return campus;
  }
}

export default CreateCampusService;
