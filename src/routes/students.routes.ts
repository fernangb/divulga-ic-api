import {Router} from 'express';
import CreateStudentService from '../services/CreateStudentService';
import {getCustomRepository} from 'typeorm';

const studentRouter = Router();

studentRouter.post('/', async (request, response) => {
  try{
    const {fullName, course_id, email, password, dre} = request.body;

    const createStudent = new CreateStudentService();

    const student = await createStudent.execute({
      fullName,
      course_id,
      email,
      password,
      dre
    });

    const studentResponse = {
      fullName,
      course_id,
      email,
      dre
    }

    return response.json(studentResponse);
  }catch(err){
    return response.status(400).json({error: err.message});
  }
});

export default studentRouter;
