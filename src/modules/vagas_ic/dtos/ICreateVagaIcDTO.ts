export default interface ICreateVagaIcDTO {
  nome: string;
  descricao?: string;
  vl_bolsa?: number;
  hr_semana?: number;
  cr_minimo?: number;
  periodo_minimo?: number;
  id_laboratorio: string;
  id_curso: string;
  id_professor: string;
  id_area: string;
}
