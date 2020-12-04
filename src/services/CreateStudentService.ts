import Student from '../models/Student';
import {getCustomRepository, getRepository} from 'typeorm';

interface StudentDTO {
  fullName: string;
  email: string;
  password: string;
  course_id: string;
  dre: string;
}

class CreateStudentService {
  public async execute({fullName, email, password, course_id, dre}: StudentDTO): Promise<Student>{
    const studentsRepository = getRepository(Student);

    const checkStudentExists = await studentsRepository.findOne({
      where: {email}
    });

    if(checkStudentExists){
      throw new Error('Email já cadastrado no sistema.');
    }

    const student = studentsRepository.create({fullName, course_id, email, password, dre});

    await studentsRepository.save(student);

    return student;
  }
}

export default CreateStudentService;
