export default interface ICreateCursoDTO {
  nome: string;
  predioId: string;
  endereco: string;
  nrPeriodos: number;
  tipo: 'Bacharel' | 'Licenciatura';
  turno: 'Integral' | 'Noturno';
}
