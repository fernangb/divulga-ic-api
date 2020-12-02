import Course from '../models/Course';
import {parseISO} from 'date-fns';

interface CreateCourseDTO {
  name: string;
  building: string;
  address:  string;
  type: 'Bacharel' | 'Licenciatura';
  schedule: 'Integral' | 'Noturno';
}

class CoursesRepository {
  private courses: Course[];

  constructor(){
    this.courses = [];
  }

  public create({name, building, address, type, schedule}: CreateCourseDTO): Course{
    const course = new Course({name, building, address, type, schedule});

    this.courses.push(course);
    parseISO(Date.now().toString());

    return course;
  }

  public all(): Course[]{
    return this.courses;
  }


}

export default CoursesRepository;
