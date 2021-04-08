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

  public async create({
    nome,
    descricao,
    vl_bolsa,
    hr_semana,
    cr_minimo,
    periodo_minimo,
    id_laboratorio,
    id_professor,
  }: ICreateVagaIcDTO): Promise<VagaIc> {
    const vagaIc = this.ormRepository.create({
      nome,
      descricao,
      vl_bolsa,
      hr_semana,
      cr_minimo,
      periodo_minimo,
      id_laboratorio,
      id_professor,
    });

    await this.ormRepository.save(vagaIc);

    return vagaIc;
  }

  public async index(): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { es_aberta: true } });
  }

  public async save(vaga: VagaIc): Promise<VagaIc> {
    return this.ormRepository.save(vaga);
  }

  public async encontrarVagaExistente({
    nome,
    id_laboratorio,
  }: IVerificarVagasExistentesDTO): Promise<boolean> {
    const vagaEncontrada = await this.ormRepository.findOne({
      where: {
        nome,
        id_laboratorio,
        es_aberta: true,
      },
    });

    if (!vagaEncontrada) return false;

    return true;
  }

  public async encontrarPeloNome(nome: string): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { nome, es_aberta: true } });
  }

  public async encontrarPeloId(id: string): Promise<VagaIc | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async encontrarPeloCurso(id_curso: string): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { id_curso, es_aberta: true } });
  }

  public async encontrarPeloLaboratorio(
    id_laboratorio: string,
  ): Promise<VagaIc[]> {
    return this.ormRepository.find({
      where: { id_laboratorio, es_aberta: true },
    });
  }

  public async encontrarPelaArea(id_area: string): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { id_area, es_aberta: true } });
  }

  public async encontrarVagasRecomendadasPorAluno({
    id_curso,
  }: IListVagasIcPorAlunoDTO): Promise<VagaIc[]> {
    return this.ormRepository.find({ where: { id_curso, es_aberta: true } });
  }

  public async listarVagasCriadasPeloProfessor({
    id_professor,
  }: IListVagasIcCriadasPorProfessorDTO): Promise<VagaIc[]> {
    return this.ormRepository.find({
      where: { id_professor, es_aberta: true },
    });
  }

  public async aumentarNumeroInscritos(vaga: VagaIc): Promise<VagaIc> {
    const nr_inscritos_atualizado = vaga.nr_inscritos + 1;

    const vagaAtualizada = { ...vaga, nr_inscritos: nr_inscritos_atualizado };

    return this.ormRepository.save(vagaAtualizada);
  }

  public async diminuirNumeroInscritos(vaga: VagaIc): Promise<VagaIc> {
    const nr_inscritos_atualizado = vaga.nr_inscritos - 1;

    const vagaAtualizada = { ...vaga, nr_inscritos: nr_inscritos_atualizado };

    return this.ormRepository.save(vagaAtualizada);
  }

  public async ordenarVagasPorRecomendacao(vagas: VagaIc[]): Promise<VagaIc[]> {
    return vagas.sort((a, b) => (a.nome > b.nome ? 1 : -1));
  }
}

export default VagasIcRepository;
