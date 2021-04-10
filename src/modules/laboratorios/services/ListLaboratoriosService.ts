import Laboratorio from '@modules/laboratorios/infra/typeorm/entities/Laboratorio';
import { inject, injectable } from 'tsyringe';
import ILaboratoriosRepository from '../repositories/ILaboratoriosRepository';

@injectable()
class ListLaboratoriosService {
  constructor(
    @inject('LaboratoriosRepository')
    private laboratoriosRepository: ILaboratoriosRepository,
  ) {}

  public async execute(): Promise<Laboratorio[]> {
    return this.laboratoriosRepository.index();

  }
}

export default ListLaboratoriosService;
