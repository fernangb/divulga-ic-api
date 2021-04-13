import Area from '@modules/areas/infra/typeorm/entities/Area';
import Curso from '@modules/cursos/infra/typeorm/entities/Curso';

export default interface ICreateVagaIcDTO {
  nome: string;
  descricao?: string;
  vlBolsa?: number;
  hrSemana?: number;
  crMinimo?: number;
  nrVagas?: number;
  periodoMinimo?: number;
  laboratorioId: string;
  professorId: string;
  areas: Area[];
  cursos: Curso[];
}
