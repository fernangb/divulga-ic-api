export default interface ICreateCursoDTO {
  nome: string;
  id_predio: string;
  endereco: string;
  nr_periodos: number;
  tipo: 'Bacharel' | 'Licenciatura';
  turno: 'Integral' | 'Noturno';
}
