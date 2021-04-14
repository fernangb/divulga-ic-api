import { getRepository, Repository } from 'typeorm';
import VagaIc from '@modules/vagas_ic/infra/typeorm/entities/VagaIC';
import IVagasIcRepository from '@modules/vagas_ic/repositories/IVagasIcRepository';
import ICreateVagaIcDTO from '@modules/vagas_ic/dtos/ICreateVagaIcDTO';
import IVerificarVagasExistentesDTO from '@modules/vagas_ic/dtos/IVerificarVagasExistentesDTO';
import IListVagasIcPorAlunoDTO from '@modules/vagas_ic/dtos/IListVagasPorAlunoDTO';
import IListVagasIcCriadasPorProfessorDTO from '@modules/vagas_ic/dtos/IListVagasIcCriadasPorProfessorDTO';

class VagasIcRepository implements IVagasIcRepository {
  private ormRepository: Repository<VagaIc>;

  constructor() {
    this.ormRepository = getRepository(VagaIc);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public validarValorBolsa(vlBolsa: number): boolean {
    if (vlBolsa < 0) return false;

    return true;
  }

  public validarHorasSemanais(hrSemana: number): boolean {
    if (hrSemana < 0 || hrSemana > 20) return false;

    return true;
  }

  public validarCrMinimo(crMinimo: number): boolean {
    if (crMinimo < 0 || crMinimo > 10) return false;

    return true;
  }

  public validarPeriodoMinimo(periodoMinimo: number): boolean {
    if (periodoMinimo < 1 || periodoMinimo > 10) return false;

    return true;
  }

  public validarNumeroVagas(nrVagas: number) {
    if (nrVagas < 0) return false;

    return true;
  }

  public validarNumeroInscritos(nrInscritos: number): boolean {
    if (nrInscritos < 0) return false;

    return true;
  }

  public async create({
    nome,
    descricao,
    vlBolsa,
    hrSemana,
    crMinimo,
    periodoMinimo,
    laboratorioId,
    professorId,
    areas,
    cursos,
  }: ICreateVagaIcDTO): Promise<VagaIc> {
    const vagaIc = this.ormRepository.create({
      nome,
      descricao,
      vlBolsa,
      hrSemana,
      crMinimo,
      periodoMinimo,
      laboratorioId,
      professorId,
      areas,
      cursos,
    });

    await this.ormRepository.save(vagaIc);

    return vagaIc;
  }

  public async index(): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { esAberta: true } });
  }

  public async save(vaga: VagaIc): Promise<VagaIc> {
    return this.ormRepository.save(vaga);
  }

  public async encontrarVagaExistente({
    nome,
    laboratorioId,
  }: IVerificarVagasExistentesDTO): Promise<boolean> {
    const vagaEncontrada = await this.ormRepository.findOne({
      where: {
        nome,
        laboratorioId,
        esAberta: true,
      },
    });

    if (!vagaEncontrada) return false;

    return true;
  }

  public async encontrarPeloNome(nome: string): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { nome, esAberta: true } });
  }

  public async encontrarPeloId(id: string): Promise<VagaIc | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async encontrarPeloCurso(cursoId: string): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { cursoId, esAberta: true } });
  }

  public async encontrarPeloLaboratorio(
    laboratorioId: string,
  ): Promise<VagaIc[]> {
    return this.ormRepository.find({
      where: { laboratorioId, esAberta: true },
    });
  }

  public async encontrarPelaArea(areaId: string): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { areaId, esAberta: true } });
  }

  public async encontrarVagasRecomendadasPorAluno({
    cursoId,
  }: IListVagasIcPorAlunoDTO): Promise<VagaIc[]> {
    const vagas = await this.ormRepository.find({
      relations: ['cursos'],
      where: { esAberta: true },
    });

    const vagasFiltradas = vagas.filter(vaga => {
      return vaga.cursos.some(curso => curso.id === cursoId);
    });

    return vagasFiltradas;
  }

  public async listarVagasCriadasPeloProfessor({
    professorId,
  }: IListVagasIcCriadasPorProfessorDTO): Promise<VagaIc[]> {
    return this.ormRepository.find({
      where: { professorId, esAberta: true },
      order: {
        nome: 'ASC',
      },
    });
  }

  public async aumentarNumeroInscritos(vaga: VagaIc): Promise<VagaIc> {
    const nrInscritos_atualizado = vaga.nrInscritos + 1;

    const vagaAtualizada = { ...vaga, nrInscritos: nrInscritos_atualizado };

    return this.ormRepository.save(vagaAtualizada);
  }

  public async diminuirNumeroInscritos(vaga: VagaIc): Promise<VagaIc> {
    const nrInscritos_atualizado = vaga.nrInscritos - 1;

    const vagaAtualizada = { ...vaga, nrInscritos: nrInscritos_atualizado };

    return this.ormRepository.save(vagaAtualizada);
  }
}

export default VagasIcRepository;
