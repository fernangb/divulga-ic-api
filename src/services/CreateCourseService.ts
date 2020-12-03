import Course from '../models/Course';
import CoursesRepository from '../repositories/CoursesRepository';
import {getCustomRepository} from 'typeorm';

interface CourseDTO {
  name: string;
  building: string;
  address:  string;
  type: 'Bacharel' | 'Licenciatura';
  schedule: 'Integral' | 'Noturno';
}

class CreateCourseService {
  public async execute({name, building, address, type, schedule}: CourseDTO): Promise<Course>{
    const coursesRepository = getCustomRepository(CoursesRepository);

    const findCourse = await coursesRepository.findExistingCourse(name, type, schedule);

    if(findCourse){
      throw Error('Curso já cadastrado no sistema.');
    }

    const course = coursesRepository.create({name, building, address, type, schedule});

    await coursesRepository.save(course);

    return course;
  }
}

export default CreateCourseService;
