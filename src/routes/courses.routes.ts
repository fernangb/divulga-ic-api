import {Router} from 'express';
import CoursesRepository from '../repositories/CoursesRepository';
import CreateCourseService from '../services/CreateCourseService';
import {getCustomRepository} from 'typeorm';

const coursesRouter = Router();

coursesRouter.post('/', async (request, response) => {
  try{
    const {name, building_id, address, type, schedule} = request.body;

    const createCourse = new CreateCourseService();

    const course = await createCourse.execute({
      name,
      building_id,
      address,
      type,
      schedule
    });

    return response.json(course);
  }catch(err){
    return response.status(400).json({error: err.message});
  }
});

coursesRouter.get('/', async(request, response) => {
  const coursesRepository = getCustomRepository(CoursesRepository);

  const courses = await coursesRepository.find();

  return response.json(courses);
});

export default coursesRouter;
