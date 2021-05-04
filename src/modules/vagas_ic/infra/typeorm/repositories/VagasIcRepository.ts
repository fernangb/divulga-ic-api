import { getRepository, Repository } from 'typeorm';
import VagaIc from '@modules/vagas_ic/infra/typeorm/entities/VagaIC';
import IVagasIcRepository from '@modules/vagas_ic/repositories/IVagasIcRepository';
import ICreateVagaIcDTO from '@modules/vagas_ic/dtos/ICreateVagaIcDTO';
import IVerificarVagasExistentesDTO from '@modules/vagas_ic/dtos/IVerificarVagasExistentesDTO';
import IListVagasIcPorAlunoDTO from '@modules/vagas_ic/dtos/IListVagasPorAlunoDTO';
import IListVagasIcCriadasPorProfessorDTO from '@modules/vagas_ic/dtos/IListVagasIcCriadasPorProfessorDTO';
import IListVagasDisponiveisDTO from '@modules/vagas_ic/dtos/IListVagasDisponiveisDTO';

class VagasIcRepository implements IVagasIcRepository {
  private ormRepository: Repository<VagaIc>;

  constructor() {
    this.ormRepository = getRepository(VagaIc);
  }

  public async fecharVaga(vaga: VagaIc): Promise<void> {
    const vagaAtualizada = { ...vaga, esAberta: false };

    await this.ormRepository.save(vagaAtualizada);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
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

  public async listarVagasDisponiveis({
    esAberta,
    esPreenchida,
  }: IListVagasDisponiveisDTO): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { esAberta, esPreenchida } });
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

  public async aumentarNumeroAlunosInscritos(vaga: VagaIc): Promise<VagaIc> {
    const nrInscritosAtualizado = vaga.nrInscritos + 1;

    const vagaAtualizada = { ...vaga, nrInscritos: nrInscritosAtualizado };

    return this.ormRepository.save(vagaAtualizada);
  }

  public async diminuirNumeroAlunosInscritos(vaga: VagaIc): Promise<VagaIc> {
    const nrInscritosAtualizado = vaga.nrInscritos - 1;

    const vagaAtualizada = {
      ...vaga,
      nrInscritos: nrInscritosAtualizado,
      esPreenchida: false,
    };

    return this.ormRepository.save(vagaAtualizada);
  }

  public async aumentarNumeroAlunosSelecionados(vaga: VagaIc): Promise<VagaIc> {
    const nrSelecionadosAtualizado = vaga.nrSelecionados + 1;

    const preencher = vaga.nrVagas === nrSelecionadosAtualizado;

    const vagaAtualizada = {
      ...vaga,
      nrSelecionados: nrSelecionadosAtualizado,
      esPreenchida: preencher,
    };

    return this.ormRepository.save(vagaAtualizada);
  }

  public async diminuirNumeroAlunosSelecionados(vaga: VagaIc): Promise<VagaIc> {
    const nrSelecionadosAtualizado = vaga.nrSelecionados - 1;

    const vagaAtualizada = {
      ...vaga,
      nrSelecionados: nrSelecionadosAtualizado,
      esPreenchida: false,
    };

    return this.ormRepository.save(vagaAtualizada);
  }
}

export default VagasIcRepository;
