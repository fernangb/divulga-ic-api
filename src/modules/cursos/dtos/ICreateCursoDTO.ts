export default interface ICreateCursoDTO {
  nome: string;
  id_predio: string;
  endereco: string;
  tipo: 'Bacharel' | 'Licenciatura';
  turno: 'Integral' | 'Noturno';
}
