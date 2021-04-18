export default interface IAlunoProvider {
  validarDRE(dre: string): boolean;
  validarPeriodo(periodo: number): boolean;
  validarCR(periodo: number): boolean;
}
