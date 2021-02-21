import Laboratorio from '@modules/laboratorios/infra/typeorm/entities/Laboratorio';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ILaboratoriosRepository from '../repositories/ILaboratoriosRepository';

interface IRequest {
  nome: string;
  sigla: string;
  sala: string;
  id_predio: string;
}

@injectable()
class CreateLaboratorioService {
  constructor(
    @inject('LaboratoriosRepository')
    private laboratoriosRepository: ILaboratoriosRepository,
  ) {}

  public async execute({
    nome,
    sigla,
    sala,
    id_predio,
  }: IRequest): Promise<Laboratorio> {
    const laboratorioEncontrado = await this.laboratoriosRepository.encontrarPelaSigla(
      sigla,
    );

    if (laboratorioEncontrado) {
      throw new AppError('Laboratório já cadastrado.');
    }

    const laboratorio = await this.laboratoriosRepository.create({
      nome,
      sigla,
      id_predio,
      sala,
    });

    return laboratorio;
  }
}

export default CreateLaboratorioService;
