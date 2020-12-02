import { uuid } from "uuidv4";
import {parseISO} from 'date-fns';
import {zonedTimeToUtc} from 'date-fns-tz';


interface CreateCourseDTO {
  name: string;

  building: string;

  address: string;

  schedule: 'Integral' | 'Noturno';

  type: 'Bacharel' | 'Licenciatura';
}

class Course {

  id: string;

  name: string;

  building: string;

  address: string;

  schedule: 'Integral' | 'Noturno';

  type: 'Bacharel' | 'Licenciatura';

  created_at: Date;

  updated_at: Date;

  constructor({name, building, address, type, schedule}: CreateCourseDTO){
    const znDate = zonedTimeToUtc(new Date(), 'America/Sao_Paulo');
    const dt = new Date().toLocaleString;

    this.id = uuid();
    this.name = name;
    this.building = building;
    this.address = address;
    this.schedule = schedule;
    this.type = type;
    this.created_at = new Date();
    this.updated_at = this.created_at;
  }
}

export default Course;
