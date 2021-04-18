import IProfessorProvider from '../models/IProfessorProvider';

export default class ManualProfessorProvider implements IProfessorProvider {
  public validarSIAPE(siape: string): boolean {
    if (siape.length !== 7) {
      return false;
    }

    // eslint-disable-next-line radix
    const siapeInt = parseInt(siape);

    if (!siapeInt) {
      return false;
    }

    return true;
  }
}
