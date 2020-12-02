import {Router} from 'express';
import CoursesRepository from '../repositories/CoursesRepository';
import CreateCourseService from '../services/CreateCourseService';

const coursesRouter = Router();
const coursesRepository = new CoursesRepository();

coursesRouter.post('/', (request, response) => {
  try{
    const {name, building, address, type, schedule} = request.body;

    const createCourse = new CreateCourseService(coursesRepository);

    const course = createCourse.execute({
      name,
      building,
      address,
      type,
      schedule
    });

    return response.json(course);
  }catch(err){
    return response.status(400).json({error: err.message});
  }
});

coursesRouter.get('/', (request, response) => {
  const courses = coursesRepository.all();

  return response.json(courses);
});

export default coursesRouter;
