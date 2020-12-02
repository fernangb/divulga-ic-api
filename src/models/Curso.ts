import { uuid } from "uuidv4";
import {parseISO} from 'date-fns';

class Curso {

  id: string;

  nome: string;

  predio: string;

  endereco: string;

  // dt_criacao: Date;

  // dt_atualizacao: Date;

  constructor(nome: string, predio: string, endereco: string){
    this.id = uuid();
    this.nome = nome;
    this.predio = predio;
    this.endereco = endereco;
  }
}

export default Curso;
