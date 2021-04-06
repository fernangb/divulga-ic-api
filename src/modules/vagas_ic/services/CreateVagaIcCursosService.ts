import  ICreateVagaIcCursosDTO  from '@modules/vagas_ic/dtos/ICreateVagaIcCursosDTO';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IVagasIcRepository from '../repositories/IVagasIcRepository';
import IVagaIcCursosRepository from '../repositories/IVagaIcCursosRepository';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import VagaIcCursos from '../infra/typeorm/entities/VagaIcCursos';

@injectable()
class CreateVagaIcCursosService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('CursosRepository')
    private cursosIcRepository: ICursosRepository,
    @inject('VagaIcCursosRepository')
    private vagaIcCursosRepository: IVagaIcCursosRepository,
  ) {}

  public async execute({
    id_vaga, id_curso
  }: ICreateVagaIcCursosDTO): Promise<VagaIcCursos> {
    const vagaEncontrada = await this.vagasIcRepository.encontrarPeloId(
      id_vaga,
    );

    if (!vagaEncontrada)
      throw new AppError('Não existe a vaga de IC desejada.');

    const cursoEncontrado = await this.cursosIcRepository.encontrarPeloId(
      id_curso,
    );

    if (!cursoEncontrado)
      throw new AppError('Não existe ao curso desejado.');

    const vagaIcCursos = await this.vagaIcCursosRepository.create({
      id_vaga,
      id_curso,
    });


    return vagaIcCursos;
  }
}

export default CreateVagaIcCursosService;
