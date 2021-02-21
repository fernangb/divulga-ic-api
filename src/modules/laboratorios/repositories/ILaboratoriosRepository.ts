import ICreateLaboratorioDTO from '../dtos/ICreateLaboratorioDTO';
import Laboratorio from '../infra/typeorm/entities/Laboratorio';

export default interface ILaboratoriosRepository {
  encontrarPeloId(id: string): Promise<Laboratorio | undefined>;
  encontrarPelaSigla(sigla: string): Promise<Laboratorio | undefined>;
  create(data: ICreateLaboratorioDTO): Promise<Laboratorio>;
  save(usuario: Laboratorio): Promise<Laboratorio>;
}
