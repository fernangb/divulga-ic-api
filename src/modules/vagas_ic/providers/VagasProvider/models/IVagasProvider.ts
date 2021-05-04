export default interface IVagasProvider {
  validarValorBolsa(vlBolsa: number): boolean;
  validarHorasSemanais(hrSemana: number): boolean;
  validarCrMinimo(crMinimo: number): boolean;
  validarPeriodoMinimo(periodoMinimo: number): boolean;
  validarNumeroVagas(nrVagas: number): boolean;
  validarNumeroInscritos(nrInscritos: number): boolean;
}
