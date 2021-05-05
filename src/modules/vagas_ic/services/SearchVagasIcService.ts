/* eslint-disable @typescript-eslint/no-unused-vars */
import IInscricoesIcRepository from '@modules/vagas_ic/repositories/IInscricoesIcRepository';
import VagaIc from '@modules/vagas_ic/infra/typeorm/entities/VagaIC';
import { inject, injectable } from 'tsyringe';
import IAlunosRepository from '@modules/alunos/repositories/IAlunosRepository';
import AppError from '@shared/errors/AppError';
import ISearchVagasIcDTO from '../dtos/ISearchVagasIcDTO';
import IVagasIcRepository from '../repositories/IVagasIcRepository';

@injectable()
class SearchVagasIcService {
  constructor(
    @inject('VagasIcRepository')
    private vagasIcRepository: IVagasIcRepository,
    @inject('InscricoesIcRepository')
    private inscricoesIcRepository: IInscricoesIcRepository,
    @inject('AlunosRepository')
    private alunosRepository: IAlunosRepository,
  ) {}

  public async execute({
    laboratorios,
    cursos,
    areas,
    professor,
    esAberta,
    esPreenchida,
    usuarioId,
  }: ISearchVagasIcDTO): Promise<VagaIc[]> {
    if (!usuarioId) throw new AppError('Usuário não encontrado.');

    const aluno = await this.alunosRepository.encontrarPeloIdUsuario(usuarioId);

    if (!aluno) throw new AppError('Aluno não encontrado.');

    const inscricoes = await this.inscricoesIcRepository.listarVagasInscritasPeloAluno(
      aluno.id,
    );

    const vagasTotais = await this.vagasIcRepository.listarVagasDisponiveis({
      laboratorios,
      professor,
      areas,
      cursos,
      esAberta,
      esPreenchida,
    });

    console.log(cursos);

    const vagasIcNaoInscritas = vagasTotais.filter(vaga => {
      return !inscricoes.map(inscricao => inscricao.vagaIcId).includes(vaga.id);
    });

    const vagasFiltradasPorCurso = !vagasIcNaoInscritas
      ? vagasIcNaoInscritas
      : vagasIcNaoInscritas.filter(vaga => {
          return vaga.cursos.some(c => cursos.find(curso => curso === c.nome));
        });

    const vagasFiltradasPorArea = !vagasFiltradasPorCurso
      ? vagasIcNaoInscritas
      : vagasFiltradasPorCurso.filter(vaga => {
          return vaga.areas.some(a => areas.find(area => area === a.nome));
        });

    const vagasFiltradas = !vagasFiltradasPorArea
      ? vagasFiltradasPorArea
      : vagasFiltradasPorArea.filter(vaga =>
          laboratorios.includes(vaga.laboratorio.nome),
        );

    console.log('total: ', vagasTotais.length);
    console.log('inscr: ', vagasIcNaoInscritas.length);
    console.log('curso: ', vagasFiltradasPorCurso.length);
    console.log('area: ', vagasFiltradasPorArea.length);
    console.log('lab: ', vagasFiltradas.length);

    return vagasFiltradas;
  }
}

export default SearchVagasIcService;
