import Laboratorio from '@modules/laboratorios/infra/typeorm/entities/Laboratorio';
import ILaboratoriosRepository from '@modules/laboratorios/repositories/ILaboratoriosRepository';
import ICreateLaboratorioDTO from '@modules/laboratorios/dtos/ICreateLaboratorioDTO';
import { v4 as uuid_v4 } from 'uuid';

class FakeLaboratoriosRepository implements ILaboratoriosRepository {
  private laboratorios: Laboratorio[] = [];

  public async encontrarPeloId(id: string): Promise<Laboratorio | undefined> {
    const laboratorioEncontrado = this.laboratorios.find(
      laboratorio => laboratorio.id === id,
    );

    return laboratorioEncontrado;
  }

  public async encontrarPelaSigla(
    sigla: string,
  ): Promise<Laboratorio | undefined> {
    const laboratorioEncontrado = this.laboratorios.find(
      laboratorio => laboratorio.sigla === sigla,
    );

    return laboratorioEncontrado;
  }

  public async create({
    nome,
    sigla,
    sala,
    id_predio,
  }: ICreateLaboratorioDTO): Promise<Laboratorio> {
    const laboratorio = new Laboratorio();

    Object.assign(laboratorio, { id: uuid_v4(), nome, sigla, sala, id_predio });

    this.laboratorios.push(laboratorio);

    return laboratorio;
  }

  public async save(laboratorio: Laboratorio): Promise<Laboratorio> {
    const indiceLaboratorio = this.laboratorios.findIndex(
      u => u.id === laboratorio.id,
    );

    this.laboratorios[indiceLaboratorio] = laboratorio;

    return laboratorio;
  }
}

export default FakeLaboratoriosRepository;
