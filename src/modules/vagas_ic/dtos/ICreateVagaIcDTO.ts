import Area from "@modules/areas/infra/typeorm/entities/Area";
import AreasVagasIC from "../infra/typeorm/entities/AreasVagasIC";

export default interface ICreateVagaIcDTO {
  nome: string;
  descricao?: string;
  vl_bolsa?: number;
  hr_semana?: number;
  cr_minimo?: number;
  nr_vagas?: number;
  periodo_minimo?: number;
  id_laboratorio: string;
  id_professor: string;
}
