import Nivel from '@modules/usuarios/infra/typeorm/entities/Nivel';
import INiveisRepository from '@modules/usuarios/repositories/INiveisRepository';
import ICreateNivelDTO from '@modules/usuarios/dtos/ICreateNivelDTO';
import { v4 as uuid_v4 } from 'uuid';

class NiveisRepository implements INiveisRepository {
  private niveis: Nivel[] = [];

  public async encontrarPeloNome(nome: string): Promise<Nivel | undefined> {
    const nivelEncontrado = this.niveis.find(nivel => nivel.nome === nome);

    return nivelEncontrado;
  }

  public async create({ nome }: ICreateNivelDTO): Promise<Nivel> {
    const nivel = new Nivel();

    Object.assign(nivel, { id: uuid_v4(), nome });

    this.niveis.push(nivel);

    return nivel;
  }
}

export default NiveisRepository;
