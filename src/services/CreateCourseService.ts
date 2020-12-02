import Course from '../models/Course';
import CoursesRepository from '../repositories/CoursesRepository';

interface CourseDTO {
  name: string;
  building: string;
  address:  string;
  type: 'Bacharel' | 'Licenciatura';
  schedule: 'Integral' | 'Noturno';
}

class CreateCourseService {
  private coursesRepository: CoursesRepository;

  constructor(coursesRepository: CoursesRepository){
    this.coursesRepository = coursesRepository;
  }

  public execute({name, building, address, type, schedule}: CourseDTO): Course{

    const course = this.coursesRepository.create({name, building, address, type, schedule});

    return course;

  }
}

export default CreateCourseService;
