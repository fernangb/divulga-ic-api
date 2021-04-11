export default interface IUpdateVagaIcDTO {
  id: string;
  nome?: string;
  descricao?: string;
  vlBolsa?: number;
  hrSemana?: number;
  crMinimo?: number;
  periodoMinimo?: number;
  nrVagas?: number;
  laboratorio?: string;
  areas: string[];
  cursos: string[];
}
