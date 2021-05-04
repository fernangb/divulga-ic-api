import IVagasProvider from '../models/IVagasProvider';

export default class ManualVagasProvider implements IVagasProvider {
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

  public validarNumeroVagas(nrVagas: number): boolean {
    if (nrVagas < 0) return false;

    return true;
  }

  public validarNumeroInscritos(nrInscritos: number): boolean {
    if (nrInscritos < 0) return false;

    return true;
  }
}
