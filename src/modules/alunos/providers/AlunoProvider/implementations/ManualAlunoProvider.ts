import IAlunoProvider from '../models/IAlunoProvider';

export default class ManualAlunoProvider implements IAlunoProvider {
  public validarDRE(dre: string): boolean {
    if (dre.length !== 9) {
      return false;
    }

    // eslint-disable-next-line radix
    const dreInt = parseInt(dre);

    if (!dreInt) {
      return false;
    }

    return true;
  }

  public validarPeriodo(periodo: number): boolean {
    if (periodo < 1 || periodo > 20) {
      return false;
    }

    return true;
  }

  public validarCR(cr: number): boolean {
    if (cr < 0 || cr > 10) {
      return false;
    }

    return true;
  }
}
