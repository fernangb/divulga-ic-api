import Course from '../models/Course';
import CoursesRepository from '../repositories/CoursesRepository';
import {getCustomRepository} from 'typeorm';

interface CourseDTO {
  name: string;
  building_id: string;
  address:  string;
  type: 'Bacharel' | 'Licenciatura';
  schedule: 'Integral' | 'Noturno';
}

class CreateCourseService {
  public async execute({name, building_id, address, type, schedule}: CourseDTO): Promise<Course>{
    const coursesRepository = getCustomRepository(CoursesRepository);

    const checkCourseExists = await coursesRepository.findExistingCourse(name, type, schedule);

    if(checkCourseExists){
      throw Error('Curso já cadastrado no sistema.');
    }

    const course = coursesRepository.create({name, building_id, address, type, schedule});

    await coursesRepository.save(course);

    return course;
  }
}

export default CreateCourseService;
